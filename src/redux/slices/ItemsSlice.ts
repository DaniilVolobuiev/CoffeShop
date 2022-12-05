import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosGetItems = createAsyncThunk(
  'items/axiosItemsStatus',
  async (params: Record<string, number>) => {
    const { activeSort, categoryId } = params;
    console.log(activeSort);
    console.log(categoryId);

    const data = await axios.get<itemType[]>(
      `https://coffe-shop-32182-default-rtdb.firebaseio.com/Items.json${
        categoryId === 0 ? '' : `?orderBy="category"&equalTo=${categoryId}&print=pretty`
      }`,
    );
    const dataToSort: itemType[] = Object.values(data.data);
    console.log(dataToSort);
    return dataToSort.sort(function (a, b): any {
      console.log(activeSort);
      if (activeSort === 0) {
        return b.rating - a.rating;
      } else if (activeSort === 1) {
        return b.price - a.price;
      } else if (activeSort === 2) {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        }

        if (titleA > titleB) {
          return 1;
        }

        return 0;
      }
    });
  },
);
export type itemType = {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
  count?: number;
  cartID: string;
};
interface ItemsSliceState {
  items: itemType[];
  status: 'loading' | 'success' | 'error';
}

const initialState: ItemsSliceState = {
  items: [],
  status: 'loading',
};

export const itemsReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosGetItems.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(axiosGetItems.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.items = action.payload;
    });
    builder.addCase(axiosGetItems.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
// export const { setItems } = itemsReducer.actions;

export default itemsReducer.reducer;
