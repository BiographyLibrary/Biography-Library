import { callAI } from '@/lib/ai/ai-client';
import { HELP_KB_TEXT } from './help-kb';

export type HelpLanguage = 'en' | 'it' | 'fr' | 'de';

export interface HelpResponse {
  answer: string;
  confidence: 'high' | 'low';
}

const FALLBACK_MESSAGES: Record<HelpLanguage, string> = {
  en: "I'm not sure about that. For detailed guidance, please check the FAQ or contact support.",
  it: "Non sono sicuro di questo. Per una guida dettagliata, consulta le FAQ o contatta il supporto.",
  fr: "Je ne suis pas sûr de cela. Pour des instructions détaillées, veuillez consulter la FAQ ou contacter le support.",
  de: "Ich bin mir dabei nicht sicher. Ausführliche Anleitungen finden Sie in den FAQ oder beim Support.",
};

const LANG_NAMES: Record<HelpLanguage, string> = {
  en: 'English',
  it: 'Italian',
  fr: 'French',
  de: 'German',
};

const LOW_CONFIDENCE_PHRASES = [
  "i don't know",
  "i'm not sure",
  "i cannot answer",
  "not covered",
  "outside the scope",
  "no information",
  "non lo so",
  "non sono sicuro",
  "je ne sais pas",
  "ich weiß nicht",
  "cannot help",
  "unable to answer",
];

function detectLowConfidence(text: string): boolean {
  const lower = text.toLowerCase();
  return LOW_CONFIDENCE_PHRASES.some((phrase) => lower.includes(phrase));
}

function buildHelpContent(question: string, language: HelpLanguage): string {
  const langName = LANG_NAMES[language];
  return `BIOGRAPHY LIBRARY — HELP KNOWLEDGE BASE:

${HELP_KB_TEXT}

---

TASK: Answer the following user question using ONLY the information in the knowledge base above. Do not invent features or steps that are not described. Respond in ${langName}. If the question is completely outside the scope of Biography Library features, say you cannot answer it. Keep the answer clear and helpful (3–6 sentences maximum).

USER QUESTION: ${question}

ANSWER:`;
}

export async function askHelpBot(
  question: string,
  language: HelpLanguage = 'en'
): Promise<HelpResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    return { answer: FALLBACK_MESSAGES[language], confidence: 'low' };
  }

  try {
    const content = buildHelpContent(trimmed, language);

    const result = await callAI({
      action: 'summary',
      sectionTitle: `Help: ${trimmed.slice(0, 80)}`,
      content,
      language,
    });

    const rawAnswer: string = result.summary ?? '';

    if (!rawAnswer || rawAnswer.trim().length < 10) {
      return { answer: FALLBACK_MESSAGES[language], confidence: 'low' };
    }

    const isLowConfidence = detectLowConfidence(rawAnswer);

    return {
      answer: rawAnswer.trim(),
      confidence: isLowConfidence ? 'low' : 'high',
    };
  } catch (err: any) {
    const message = err?.message ?? '';
    if (
      message === 'SESSION_EXPIRED' ||
      message === 'TOKEN_EXPIRED' ||
      message.includes('Rate limit') ||
      message.includes('AI_TIMEOUT')
    ) {
      throw err;
    }
    return { answer: FALLBACK_MESSAGES[language], confidence: 'low' };
  }
}
