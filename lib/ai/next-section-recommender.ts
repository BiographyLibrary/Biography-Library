import { callAI } from './ai-client';

export interface SectionRecommendation {
  recommendedSection: string;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
}

const SECTION_ORDER_PRIORITY = {
  'childhood': 1,
  'family': 2,
  'education': 3,
  'career': 4,
  'relationships': 5,
  'passions': 6,
  'life-events': 7,
  'challenges': 8,
  'legacy': 9,
};

const SECTION_TRANSLATIONS = {
  en: {
    'childhood': 'Childhood & Early Years',
    'family': 'Family Background',
    'education': 'Education',
    'career': 'Career & Work',
    'life-events': 'Important Life Events',
    'relationships': 'Relationships & Love',
    'challenges': 'Challenges & Lessons Learned',
    'passions': 'Passions & Hobbies',
    'legacy': 'Legacy & Final Thoughts',
  },
  it: {
    'childhood': 'Infanzia e Primi Anni',
    'family': 'Famiglia e Origini',
    'education': 'Educazione',
    'career': 'Carriera e Lavoro',
    'life-events': 'Eventi Importanti',
    'relationships': 'Relazioni e Amore',
    'challenges': 'Sfide e Lezioni',
    'passions': 'Passioni e Hobby',
    'legacy': 'Eredità e Riflessioni',
  },
  fr: {
    'childhood': 'Enfance et Premières Années',
    'family': 'Famille et Origines',
    'education': 'Éducation',
    'career': 'Carrière et Travail',
    'life-events': 'Événements Importants',
    'relationships': 'Relations et Amour',
    'challenges': 'Défis et Leçons',
    'passions': 'Passions et Hobbies',
    'legacy': 'Héritage et Réflexions',
  },
  de: {
    'childhood': 'Kindheit und Frühe Jahre',
    'family': 'Familie und Herkunft',
    'education': 'Bildung',
    'career': 'Karriere und Arbeit',
    'life-events': 'Wichtige Ereignisse',
    'relationships': 'Beziehungen und Liebe',
    'challenges': 'Herausforderungen und Lektionen',
    'passions': 'Leidenschaften und Hobbys',
    'legacy': 'Vermächtnis und Gedanken',
  },
};

function getDefaultRecommendation(
  completedSections: string[],
  availableSections: string[],
  language: string
): SectionRecommendation {
  const remaining = availableSections.filter(s => !completedSections.includes(s));

  if (remaining.length === 0) {
    return {
      recommendedSection: 'legacy',
      reason: language === 'it'
        ? 'Hai completato tutte le sezioni! Considera di rivedere la sezione Eredità per aggiungere riflessioni finali.'
        : language === 'fr'
        ? 'Vous avez terminé toutes les sections! Pensez à revoir la section Héritage pour ajouter des réflexions finales.'
        : language === 'de'
        ? 'Sie haben alle Abschnitte abgeschlossen! Erwägen Sie, den Abschnitt Vermächtnis zu überprüfen, um abschließende Gedanken hinzuzufügen.'
        : 'You\'ve completed all sections! Consider reviewing the Legacy section to add final thoughts.',
      confidence: 'medium',
    };
  }

  const nextByOrder = remaining.sort((a, b) => {
    const priorityA = SECTION_ORDER_PRIORITY[a as keyof typeof SECTION_ORDER_PRIORITY] || 999;
    const priorityB = SECTION_ORDER_PRIORITY[b as keyof typeof SECTION_ORDER_PRIORITY] || 999;
    return priorityA - priorityB;
  })[0];

  const sectionTranslations = SECTION_TRANSLATIONS[language as keyof typeof SECTION_TRANSLATIONS] || SECTION_TRANSLATIONS.en;
  const sectionTitle = sectionTranslations[nextByOrder as keyof typeof sectionTranslations] || nextByOrder;

  const reasons = {
    en: `Following a natural chronological flow, ${sectionTitle} would be a great next step.`,
    it: `Seguendo un flusso cronologico naturale, ${sectionTitle} sarebbe un ottimo prossimo passo.`,
    fr: `En suivant un flux chronologique naturel, ${sectionTitle} serait une excellente prochaine étape.`,
    de: `In einem natürlichen chronologischen Ablauf wäre ${sectionTitle} ein guter nächster Schritt.`,
  };

  return {
    recommendedSection: nextByOrder,
    reason: reasons[language as keyof typeof reasons] || reasons.en,
    confidence: 'medium',
  };
}

export async function recommendNextSection(
  currentSection: string,
  completedSections: string[],
  sectionContent: string,
  availableSections: string[],
  language: string
): Promise<SectionRecommendation> {
  const contentExcerpt = sectionContent.slice(0, 500);

  if (!contentExcerpt || contentExcerpt.length < 50) {
    return getDefaultRecommendation(completedSections, availableSections, language);
  }

  try {
    const result = await callAI({
      action: 'recommend-next-section',
      currentSection,
      completedSections,
      sectionContent: contentExcerpt,
      availableSections: availableSections.filter(s => !completedSections.includes(s)),
      language,
    });

    if (!result || typeof result !== 'object' || !result.recommendedSection) {
      console.warn('Invalid recommendation format, using default');
      return getDefaultRecommendation(completedSections, availableSections, language);
    }

    return {
      recommendedSection: result.recommendedSection,
      reason: result.reason || '',
      confidence: result.confidence || 'medium',
    };
  } catch (error) {
    console.error('Failed to get AI recommendation:', error);
    return getDefaultRecommendation(completedSections, availableSections, language);
  }
}

export function getSectionTitle(sectionKey: string, language: string): string {
  const translations = SECTION_TRANSLATIONS[language as keyof typeof SECTION_TRANSLATIONS] || SECTION_TRANSLATIONS.en;
  return translations[sectionKey as keyof typeof translations] || sectionKey;
}
