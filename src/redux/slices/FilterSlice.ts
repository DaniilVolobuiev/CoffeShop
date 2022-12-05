import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
  categoryId: number;
  sort: number;
  currentPage: number;
  sortList?: string[];
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: 0,
  currentPage: 1,
  sortList: ['rating', 'price', 'title'],
};

export const filterReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = Number(action.payload.sort);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterReducer.actions;

export default filterReducer.reducer;
