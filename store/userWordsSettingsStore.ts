import { create } from 'zustand';
import { UserWordsSettingsType } from '@/types/Types';

type UserWordsSettingsState = {
  userWordsSettings: UserWordsSettingsType;
  setUserWordsSettings: (settings: Partial<UserWordsSettingsType>) => void;
  incrementPageOffset: () => void;
  decrementPageOffset: () => void;
};

const useUserWordsSettingsStore = create<UserWordsSettingsState>((set) => ({
  userWordsSettings: {
    sort_field: "created_at",
    sort_order: "DESC",
    start_index: 0,
    end_index: 10,
    start_review_count: 0,
    end_review_count: 100,
    date_field: "created_at",
    start_date: "",
    end_date: "",
    display_count: 10,
    page_offset: 1,
  },
  
  // userWordsSettingsを更新するアクション 
  setUserWordsSettings: (settings: Partial<UserWordsSettingsType>) =>
    set((state) => ({
      userWordsSettings: { ...state.userWordsSettings, ...settings },
    })),

  // page_offsetを+1するアクション
  incrementPageOffset: () =>
    set((state) => ({
      userWordsSettings: {
        ...state.userWordsSettings,
        page_offset: state.userWordsSettings.page_offset + 1,
      },
    })),

  // page_offsetを-1するアクション
  decrementPageOffset: () =>
    set((state) => ({
      userWordsSettings: {
        ...state.userWordsSettings,
        page_offset: state.userWordsSettings.page_offset - 1,
      },
    })),
}));

export default useUserWordsSettingsStore;
