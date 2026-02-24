import Groq from 'groq-sdk';

if (!process.env.GROQ_API_KEY) {
  throw new Error('Please add your Groq API key to .env');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzePersonality(name: string, description: string, sampleText: string) {
  const prompt = `You are an expert psychologist and personality analyst. Analyze the following person and provide a detailed personality profile in JSON format.

Name: ${name}
Description: ${description}
Sample Text/Communication: ${sampleText}

Provide your analysis in this exact JSON structure:
{
  "traits": ["trait1", "trait2", "trait3", "trait4", "trait5"],
  "communicationStyle": "description of communication style",
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "emotionalProfile": "description of emotional characteristics",
  "leadershipType": "leadership style description",
  "compatibilityInsights": "insights about compatibility with others",
  "summary": "comprehensive summary paragraph",
  "scores": {
    "openness": 85,
    "conscientiousness": 75,
    "extraversion": 65,
    "agreeableness": 80,
    "neuroticism": 45
  }
}

Provide only valid JSON, no additional text.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content || '';
  return JSON.parse(content);
}

export async function chatWithPersona(personaData: any, message: string, conversationHistory: any[] = []) {
  const systemPrompt = `You are roleplaying as a persona with the following characteristics:

Name: ${personaData.name}
Role: ${personaData.role}
Tone: ${personaData.tone}
Traits: ${personaData.traits.join(', ')}
Expertise: ${personaData.expertise}
Backstory: ${personaData.backstory}
Communication Style: ${personaData.communicationStyle}

Stay in character and respond according to these traits. Be consistent with the personality.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: 'user', content: message },
  ];

  const completion = await groq.chat.completions.create({
    messages: messages as any,
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 1000,
  });

  return completion.choices[0]?.message?.content || '';
}

export default groq;
