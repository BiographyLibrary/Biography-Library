import { supabase } from './supabase';

export type SectionStatus = 'in_progress' | 'draft_1' | 'draft_2' | 'draft_3' | 'approved' | 'locked';

export interface SectionStatusData {
  biography_id: string;
  section_key: string;
  status: SectionStatus;
  draft_version: number;
  approved_at: string | null;
  revision_history: Array<{
    version: number;
    timestamp: string;
    ai_suggestions?: any[];
    user_action?: string;
  }>;
}

export async function getSectionStatus(
  biographyId: string,
  sectionKey: string
): Promise<SectionStatusData | null> {
  try {
    const { data, error } = await supabase
      .from('biography_sections')
      .select('*')
      .eq('biography_id', biographyId)
      .eq('section_key', sectionKey)
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error loading section status:', error);
    return null;
  }
}

export async function updateSectionStatus(
  biographyId: string,
  sectionKey: string,
  updates: Partial<SectionStatusData>
): Promise<boolean> {
  try {
    const existing = await getSectionStatus(biographyId, sectionKey);

    if (existing) {
      const { error } = await supabase
        .from('biography_sections')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('biography_id', biographyId)
        .eq('section_key', sectionKey);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('biography_sections')
        .insert({
          biography_id: biographyId,
          section_key: sectionKey,
          status: updates.status || 'in_progress',
          draft_version: updates.draft_version || 1,
          approved_at: updates.approved_at || null,
          revision_history: updates.revision_history || [],
        });

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating section status:', error);
    return false;
  }
}

export async function addRevisionToHistory(
  biographyId: string,
  sectionKey: string,
  revision: {
    version: number;
    ai_suggestions?: any[];
    user_action?: string;
  }
): Promise<boolean> {
  try {
    const existing = await getSectionStatus(biographyId, sectionKey);
    if (!existing) return false;

    const newHistory = [
      ...(existing.revision_history || []),
      {
        ...revision,
        timestamp: new Date().toISOString(),
      },
    ];

    return await updateSectionStatus(biographyId, sectionKey, {
      revision_history: newHistory,
    });
  } catch (error) {
    console.error('Error adding revision:', error);
    return false;
  }
}
