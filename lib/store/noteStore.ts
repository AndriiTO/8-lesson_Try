import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../api';

const NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export type Draft = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};


interface NoteStore {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}
interface NoteDraftState {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

export const useNoteDraftStore: UseBoundStore<StoreApi<NoteDraftState>> = create<NoteDraftState>((set) => ({
  title: '',
  content: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
}));

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
     
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);





















// import { create } from 'zustand';


// interface Draft {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }