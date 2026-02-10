import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabType = 'popular' | 'nowPlaying' | 'favorites';

interface CategoryTabsState {
  activeTab: TabType;
}

const initialState: CategoryTabsState = {
  activeTab: 'popular',
};

const categoryTabsSlice = createSlice({
  name: 'categoryTabs',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabType>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = categoryTabsSlice.actions;

export default categoryTabsSlice.reducer;
