import { callAI } from './ai-client';

export interface SectionThemeAnalysis {
  sectionKey: string;
  sectionTitle: string;
  themes: string[];
  mainTheme: string;
  contentSummary: string;
}

export interface NarrativeStructureProposal {
  structureType: string;
  sectionOrder: string[];
  rationale: string;
  transitionNotes: string[];
  focusTheme: string;
}

export interface StructureAnalysisResult {
  themeAnalysis: SectionThemeAnalysis[];
  proposals: NarrativeStructureProposal[];
  originalOrder: string[];
}

export async function analyzeThemes(
  sections: { key: string; title: string; content: string }[],
  language: string
): Promise<SectionThemeAnalysis[]> {
  const result = await callAI({
    action: 'analyze-themes',
    sections,
    language,
  });

  return result.analysis || [];
}

export async function proposeAlternativeStructures(
  themeAnalysis: SectionThemeAnalysis[],
  originalOrder: string[],
  language: string
): Promise<NarrativeStructureProposal[]> {
  const result = await callAI({
    action: 'propose-structures',
    themeAnalysis,
    originalOrder,
    language,
  });

  return result.proposals || [];
}
