import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

/**
 * Generate a chat completion using OpenAI
 */
export async function generateChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: options?.model || 'gpt-4o-mini',
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 500,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response');
  }
}

/**
 * Stream a chat completion (for future use)
 */
export async function streamChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  onChunk: (chunk: string) => void,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<void> {
  try {
    const stream = await openai.chat.completions.create({
      model: options?.model || 'gpt-4o-mini',
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('OpenAI streaming error:', error);
    throw new Error('Failed to stream response');
  }
}
