import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import React from 'react';

// const currentPage = useAppSelector((state) => state.filterReducer.currentPage);
// const [itemsPerPage, setItemsPerPage] = React.useState(3);
// const lastItemIndex = state.currentPage * itemsPerPage;
// const firstItemIndex = lastItemIndex - itemsPerPage;
// const currentCountry = items.slice(firstItemIndex, lastItemIndex);
// let totalItems = items.length;
// const paginate = (pageNumber: number) => {
//   dispatch(setCurrentPage(pageNumber));
// };

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
