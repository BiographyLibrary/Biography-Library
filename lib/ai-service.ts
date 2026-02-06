import type { AiSuggestion, AiPrompt } from './ai-constants';

const AI_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/ai-assistant`;

async function callAiFunction(
  token: string,
  body: Record<string, string>
): Promise<any> {
  const res = await fetch(AI_FUNCTION_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
  }

  if (res.status === 503) {
    throw new Error('AI service is not configured yet.');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.error('AI request failed:', { status: res.status, statusText: res.statusText, data });
    const errorMsg = data.error || `AI request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  return res.json();
}

export async function checkGrammar(
  token: string,
  sectionTitle: string,
  content: string,
  language: string = 'en'
): Promise<AiSuggestion[]> {
  const result = await callAiFunction(token, {
    action: 'grammar',
    sectionTitle,
    content,
    language,
  });

  console.log('Grammar check result:', result);

  if (!result || typeof result !== 'object') {
    console.error('Invalid result format:', result);
    throw new Error('Invalid response format from AI service');
  }

  const raw = Array.isArray(result.data) ? result.data : [];
  return raw.map((item: any, index: number) => ({
    id: item.id || `suggestion-${Date.now()}-${index}`,
    original: item.original || '',
    suggestion: item.suggestion || '',
    explanation: item.explanation || '',
    status: 'pending' as const,
  }));
}

export async function getGuidedPrompts(
  token: string,
  sectionKey: string,
  sectionTitle: string,
  language: string = 'en'
): Promise<AiPrompt[]> {
  const result = await callAiFunction(token, {
    action: 'prompts',
    sectionKey,
    sectionTitle,
    language,
  });

  console.log('Guided prompts result:', result);

  if (!result || typeof result !== 'object') {
    console.error('Invalid result format:', result);
    throw new Error('Invalid response format from AI service');
  }

  const raw = Array.isArray(result.data) ? result.data : [];
  return raw.map((item: any) => ({
    prompt: item.prompt || '',
    starter: item.starter || '',
  }));
}

export async function getSummary(
  token: string,
  sectionTitle: string,
  content: string,
  language: string = 'en'
): Promise<string> {
  const result = await callAiFunction(token, {
    action: 'summary',
    sectionTitle,
    content,
    language,
  });

  console.log('Summary result:', result);

  if (!result || typeof result !== 'object') {
    console.error('Invalid result format:', result);
    throw new Error('Invalid response format from AI service');
  }

  return result.summary || '';
}
