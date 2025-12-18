
import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
import { Message, SimulationConfig } from '../types';

/**
 * SECURITY COMPLIANCE:
 * To protect the app owner from unauthorized billing, we prioritize the 
 * "Key Selection" flow for all generative operations.
 */
const getAuthorizedAIClient = async (isProFeature: boolean = false): Promise<GoogleGenAI | null> => {
    const win = window as any;
    
    // Check if user has already selected a key via the AI Studio dialog
    const hasSelected = win.aistudio ? await win.aistudio.hasSelectedApiKey() : false;

    // If it's a "Pro" feature (Veo, Thinking, High-Res Image) and no key is selected, force selection
    if (isProFeature && !hasSelected && win.aistudio) {
        await win.aistudio.openSelectKey();
    }

    // Always use process.env.API_KEY as the source of truth.
    // In AI Studio, this is injected. In local/deployed, this should be set in the environment.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("Security Alert: No API Key available in environment.");
        return null;
    }

    // Create a NEW instance every time to ensure we capture the most up-to-date session key
    return new GoogleGenAI({ apiKey });
};

const handleGeminiError = (error: any): string => {
    const errStr = error.toString();
    console.error("Gemini Security/API Error:", error);

    if (errStr.includes("429") || errStr.includes("Resource has been exhausted")) {
        return "⚠️ Rate Limit: The AI is currently at capacity. Please try again in a few moments.";
    }
    if (errStr.includes("Requested entity was not found")) {
        // This specific error often triggers if a selected key is expired/invalid
        const win = window as any;
        if (win.aistudio) win.aistudio.openSelectKey();
        return "⚠️ Connection Reset: Please re-select your API key to continue.";
    }
    if (errStr.includes("SAFETY")) {
        return "⚠️ Safety Filter: The model cannot process this request based on safety guidelines.";
    }
    
    return "The AI brain is currently shielded or offline. Please check your connection.";
};

// --- CORE FUNCTIONS ---

export const sendMessageToGemini = async (
  message: string,
  context: string,
  mode: 'standard' | 'search' | 'thinking' = 'standard'
): Promise<string> => {
  const isPro = mode === 'thinking';
  const ai = await getAuthorizedAIClient(isPro);
  if (!ai) return "Security Error: Authorized API Access Required.";

  try {
    const modelId = mode === 'thinking' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const tools = mode === 'search' ? [{ googleSearch: {} }] : undefined;
    const thinkingConfig = mode === 'thinking' ? { thinkingBudget: 32768 } : undefined;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: `Act as an expert AI Tutor for the "${context}" module. Be concise and professional.`,
        tools,
        thinkingConfig,
      }
    });

    let text = response.text || "Output unavailable.";

    // Handle Grounding Metadata (URLs) securely
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const links = response.candidates[0].groundingMetadata.groundingChunks
            .map((c: any) => c.web?.uri ? `[${c.web.title}](${c.web.uri})` : null)
            .filter(Boolean)
            .join(', ');
        if (links) text += `\n\nVerified Sources: ${links}`;
    }

    return text;
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    const ai = await getAuthorizedAIClient(false);
    if (!ai) return null;
    
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image', 
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "16:9" } },
        });
        
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        return part ? `data:image/png;base64,${part.inlineData.data}` : null;
    } catch (e) {
        console.error("Image Gen Error:", e);
        return null; 
    }
};

// Fix: Implement and export analyzeImage function to handle image analysis requests
export const analyzeImage = async (base64: string, prompt: string): Promise<string> => {
    const ai = await getAuthorizedAIClient(false);
    if (!ai) return "Auth Error.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: base64,
                        },
                    },
                    {
                        text: prompt
                    }
                ]
            }
        });
        return response.text || "No description provided.";
    } catch (e) {
        return handleGeminiError(e);
    }
};

// Fix: Implement and export editImage function to handle image editing using Gemini Flash Image
export const editImage = async (base64: string, prompt: string): Promise<string | null> => {
    const ai = await getAuthorizedAIClient(false);
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64,
                            mimeType: 'image/jpeg',
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
        });
        
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        return part ? `data:image/png;base64,${part.inlineData.data}` : null;
    } catch (e) {
        console.error("Image Edit Error:", e);
        return null;
    }
};

export const generateVideo = async (prompt: string): Promise<string | null> => {
    // FORCE KEY SELECTION for Veo (Paid API required)
    const ai = await getAuthorizedAIClient(true);
    if (!ai) return null;

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

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (videoUri) {
            const res = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
            const blob = await res.blob();
            return URL.createObjectURL(blob);
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const runSimulationTurn = async (
    history: Message[], 
    userMessage: string, 
    config: SimulationConfig
): Promise<{ text: string; isSuccess: boolean }> => {
    const ai = await getAuthorizedAIClient(false);
    if (!ai) return { text: "Auth Error.", isSuccess: false };

    try {
        const historyContent = history.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        historyContent.push({ role: 'user', parts: [{ text: userMessage }] });

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: historyContent,
            config: { 
                systemInstruction: `Simulation Persona: ${config.persona}. Objective: ${config.objective}. Success Condition: ${config.successCondition}. Append [SUCCESS] if achieved.` 
            }
        });

        const text = response.text || "";
        return { text: text.replace("[SUCCESS]", "").trim(), isSuccess: text.includes("[SUCCESS]") };
    } catch (e) {
        return { text: "Connection error.", isSuccess: false };
    }
};
