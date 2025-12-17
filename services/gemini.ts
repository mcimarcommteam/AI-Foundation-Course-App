
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Message, SimulationConfig } from '../types';

// Removed conflicting global declaration. Using type assertion where needed.

const getAIClient = async (): Promise<GoogleGenAI | null> => {
    // Check for user-selected key first (required for Veo/Pro features)
    const win = window as any;
    if (win.aistudio) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            // Trigger selection if strictly needed, or fall back to env if available
            // For this implementation, we try to use the selected key if possible
        }
    }
    
    // Always create a new instance to grab the latest key
    // NOTE: In production, ensure your VITE_API_KEY has usage limits set in Google Cloud Console
    // to prevent unexpected billing spikes.
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey: apiKey });
};

// Helper for error handling
const handleGeminiError = (error: any): string => {
    const errStr = error.toString();
    console.error("Gemini API Error:", error);

    if (errStr.includes("429") || errStr.includes("Resource has been exhausted")) {
        return "⚠️ High Traffic Alert: The AI Tutor is currently busy helping many students. Please wait 1 minute and try again.";
    }
    if (errStr.includes("API key not valid")) {
        return "⚠️ System Configuration Error: API Key is invalid.";
    }
    if (errStr.includes("SAFETY")) {
        return "⚠️ The AI refused to answer this query due to safety guidelines. Please rephrase.";
    }
    
    return "I'm having trouble connecting to the AI brain right now. Please check your internet connection.";
};

// --- CHAT & TUTOR ---

export const sendMessageToGemini = async (
  message: string,
  context: string,
  mode: 'standard' | 'search' | 'thinking' = 'standard'
): Promise<string> => {
  const ai = await getAIClient();
  if (!ai) return "API Key missing. Please contact administrator.";

  try {
    let modelId = "gemini-2.5-flash"; // Default (Fast)
    let tools: any[] | undefined = undefined;
    let thinkingConfig: any | undefined = undefined;

    // Feature: Search Grounding
    if (mode === 'search') {
        modelId = "gemini-2.5-flash"; 
        tools = [{ googleSearch: {} }];
    } 
    // Feature: Thinking Mode
    else if (mode === 'thinking') {
        modelId = "gemini-3-pro-preview";
        thinkingConfig = { thinkingBudget: 32768 };
    }
    // Feature: Fast AI Responses (Standard)
    else {
        // Use Flash Lite for very simple queries if available, but keeping Flash for quality
        modelId = "gemini-2.5-flash"; 
    }

    const systemPrompt = `You are an AI Tutor for the course module: "${context}". 
    Keep answers concise, educational, and encouraging. 
    If the student is frustrated, be empathetic.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        tools: tools,
        thinkingConfig: thinkingConfig,
      }
    });

    let text = response.text || "No response generated.";

    // Append sources if available (Grounding)
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const chunks = response.candidates[0].groundingMetadata.groundingChunks;
        const links = chunks
            .map((c: any) => c.web?.uri ? `[${c.web.title}](${c.web.uri})` : null)
            .filter(Boolean)
            .join(', ');
        if (links) {
            text += `\n\nSources: ${links}`;
        }
    }

    return text;
  } catch (error) {
    return handleGeminiError(error);
  }
};

// --- IMAGE GENERATION (Module View) ---
export const generateImage = async (prompt: string): Promise<string | null> => {
    const ai = await getAIClient();
    if (!ai) return null;
    
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image', 
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: { aspectRatio: "16:9" },
          },
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.error("Image Gen Error:", e);
        // We don't return the text error here because UI expects an image URL or null
        return null; 
    }
};

// --- IMAGE EDITING ---
export const editImage = async (base64Image: string, prompt: string): Promise<string | null> => {
    const ai = await getAIClient();
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: base64Image
                        }
                    },
                    { text: prompt }
                ]
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.error("Image Edit Error:", e);
        return null;
    }
};

// --- IMAGE ANALYSIS ---
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
    const ai = await getAIClient();
    if (!ai) return "API Key missing";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', 
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: base64Image
                        }
                    },
                    { text: prompt || "Analyze this image in detail." }
                ]
            }
        });
        return response.text || "Could not analyze image.";
    } catch (e) {
        return handleGeminiError(e);
    }
};

// --- VIDEO GENERATION ---
export const generateVideo = async (prompt: string): Promise<string | null> => {
    const ai = await getAIClient();
    if (!ai) return null;

    // Check for API Key selection for Veo (Veo requires paid tier usually)
    const win = window as any;
    if (win.aistudio && !(await win.aistudio.hasSelectedApiKey())) {
        await win.aistudio.openSelectKey();
    }

    try {
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        // Poll for completion
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (videoUri) {
            // Fetch the actual bytes
            const res = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
            const blob = await res.blob();
            return URL.createObjectURL(blob);
        }
        return null;
    } catch (e) {
        console.error("Veo Error:", e);
        return null;
    }
};

// --- SIMULATION ---
export const runSimulationTurn = async (
    history: Message[], 
    userMessage: string, 
    config: SimulationConfig
): Promise<{ text: string; isSuccess: boolean }> => {
    const ai = await getAIClient();
    if (!ai) return { text: "System Error: AI Connection Failed.", isSuccess: false };

    try {
        const historyContent = history.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        historyContent.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        const systemPrompt = `
        ROLE PLAY SIMULATION:
        You are acting as: ${config.persona}
        USER OBJECTIVE: ${config.objective}
        SUCCESS CONDITION: ${config.successCondition}
        
        Stay in character. 
        If the user meets the success condition, start your response with [SUCCESS].
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: historyContent,
            config: { systemInstruction: systemPrompt }
        });

        const text = response.text || "";
        const isSuccess = text.includes("[SUCCESS]");
        const cleanText = text.replace("[SUCCESS]", "").trim();

        return { text: cleanText, isSuccess };

    } catch (e) {
        return { text: handleGeminiError(e), isSuccess: false };
    }
};
