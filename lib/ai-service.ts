import type { AiSuggestion, AiPrompt } from './ai-constants';
import { aiService, AiLimitError } from './ai/ai-provider';

export { AiLimitError };

export async function checkGrammar(
  sectionTitle: string,
  content: string,
  language: string = 'en'
): Promise<AiSuggestion[]> {
  const results = await aiService.checkGrammar(sectionTitle, content, language);

  return results.map((item) => ({
    id: item.id,
    original: item.original,
    suggestion: item.suggestion,
    explanation: item.explanation,
    status: 'pending' as const,
  }));
}

export async function getGuidedPrompts(
  sectionKey: string,
  sectionTitle: string,
  language: string = 'en'
): Promise<AiPrompt[]> {
  return await aiService.getGuidedPrompts(sectionKey, sectionTitle, language);
}

export async function getSummary(
  sectionTitle: string,
  content: string,
  language: string = 'en'
): Promise<string> {
  return await aiService.getSummary(sectionTitle, content, language);
}
