import { callAI } from './ai-client';

export interface AnalyzeResponse {
  needsFollowUp: boolean;
  followUpQuestion?: string;
  acknowledgment: string;
}

export interface ConversationHistory {
  question: string;
  answer: string;
}

const SKIP_PHRASES = {
  en: ['don\'t remember', 'can\'t remember', 'prefer not to say', 'rather not', 'skip'],
  it: ['non ricordo', 'non mi ricordo', 'preferisco non dirlo', 'preferirei non', 'salta'],
  fr: ['ne me souviens pas', 'préfère ne pas dire', 'je ne sais pas', 'passer'],
  de: ['erinnere mich nicht', 'möchte nicht sagen', 'lieber nicht', 'überspringen'],
};

function detectSkipPhrase(answer: string, language: string): boolean {
  const phrases = SKIP_PHRASES[language as keyof typeof SKIP_PHRASES] || SKIP_PHRASES.en;
  const lowerAnswer = answer.toLowerCase();
  return phrases.some(phrase => lowerAnswer.includes(phrase));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export async function analyzeAndRespond(
  userAnswer: string,
  originalQuestion: string,
  conversationHistory: ConversationHistory[],
  language: string,
  hasHadFollowUp: boolean = false
): Promise<AnalyzeResponse> {
  if (detectSkipPhrase(userAnswer, language)) {
    const acknowledgments = {
      en: 'I understand. Let\'s move on.',
      it: 'Capisco. Passiamo avanti.',
      fr: 'Je comprends. Continuons.',
      de: 'Ich verstehe. Machen wir weiter.',
    };

    return {
      needsFollowUp: false,
      acknowledgment: acknowledgments[language as keyof typeof acknowledgments] || acknowledgments.en,
    };
  }

  if (hasHadFollowUp) {
    const acknowledgments = {
      en: 'Thank you for sharing that.',
      it: 'Grazie per aver condiviso questo.',
      fr: 'Merci d\'avoir partagé cela.',
      de: 'Danke, dass Sie das geteilt haben.',
    };

    return {
      needsFollowUp: false,
      acknowledgment: acknowledgments[language as keyof typeof acknowledgments] || acknowledgments.en,
    };
  }

  const wordCount = countWords(userAnswer);

  if (wordCount >= 80) {
    const acknowledgments = {
      en: 'Thank you for that wonderful detail.',
      it: 'Grazie per tutti questi dettagli.',
      fr: 'Merci pour tous ces détails.',
      de: 'Vielen Dank für die Details.',
    };

    return {
      needsFollowUp: false,
      acknowledgment: acknowledgments[language as keyof typeof acknowledgments] || acknowledgments.en,
    };
  }

  try {
    const result = await callAI({
      action: 'analyze-answer',
      userAnswer,
      originalQuestion,
      conversationHistory: conversationHistory.slice(-3),
      language,
    });

    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format from AI service');
    }

    return {
      needsFollowUp: result.needsFollowUp || false,
      followUpQuestion: result.followUpQuestion,
      acknowledgment: result.acknowledgment || 'Grazie per aver condiviso questo.',
    };
  } catch (error) {
    console.error('Failed to analyze answer:', error);

    const fallbackAcknowledgments = {
      en: 'Thank you for sharing that.',
      it: 'Grazie per aver condiviso questo.',
      fr: 'Merci d\'avoir partagé cela.',
      de: 'Danke, dass Sie das geteilt haben.',
    };

    return {
      needsFollowUp: false,
      acknowledgment: fallbackAcknowledgments[language as keyof typeof fallbackAcknowledgments] || fallbackAcknowledgments.en,
    };
  }
}
