
export enum ContentType {
  TEXT = 'TEXT',
  EXAMPLE = 'EXAMPLE',
  ACTIVITY = 'ACTIVITY',
  ASSIGNMENT = 'ASSIGNMENT',
  LAB = 'LAB',
  CASE_STUDY = 'CASE_STUDY',
  INTERACTIVE = 'INTERACTIVE',
  AI_LAB = 'AI_LAB', // New Type for specific AI tools
  DATA_VISUALIZATION = 'DATA_VISUALIZATION' // New Type for Charts
}

export interface SimulationConfig {
  persona: string;
  objective: string;
  successCondition: string;
  initialMessage: string;
}

export interface AIConfig {
  tool: 'VISION_ANALYZER' | 'VIDEO_GENERATOR' | 'IMAGE_EDITOR' | 'THINKING_PROBLEM';
  placeholder?: string;
  buttonText?: string;
}

export interface DataVisConfig {
  type: 'BIAS_SIMULATOR';
  title: string;
  description: string;
}

export interface ContentBlock {
  type: ContentType;
  heading?: string;
  body: string;
  bullets?: string[];
  imagePlaceholder?: string; 
  linkUrl?: string; 
  linkText?: string; 
  simulationConfig?: SimulationConfig; 
  aiConfig?: AIConfig; 
  dataVisConfig?: DataVisConfig; // New Field
}

export interface WeekModule {
  id: string;
  weekRange: string;
  title: string;
  description: string;
  content: ContentBlock[];
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}