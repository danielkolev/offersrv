
import { Offer } from '@/types/offer';

export interface DraftState {
  isDirty: boolean;
  autoSaveEnabled: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  hasUserInteracted: boolean;
  createdAt: Date;
}

export interface DraftActions {
  setIsDirty: (value: boolean) => void;
  markUserInteraction: () => void;
  saveDraft: () => Promise<void>;
  toggleAutoSave: () => void;
  resetDraftState: () => Promise<void>;
}
