export interface Persona {
  _id?: string;
  name: string;
  role: string;
  tone: string;
  traits: string[];
  expertise: string;
  backstory: string;
  communicationStyle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  _id?: string;
  name: string;
  description: string;
  sampleText: string;
  traits: string[];
  communicationStyle: string;
  strengths: string[];
  weaknesses: string[];
  emotionalProfile: string;
  leadershipType: string;
  compatibilityInsights: string;
  summary: string;
  scores: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  createdAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  _id?: string;
  personaId: string;
  personaName: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  animationIntensity: 'low' | 'medium' | 'high';
  cursorEffects: boolean;
  glowLevel: number;
}
