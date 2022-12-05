import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from './../../utils/getCartFromLS';
import { calcTotalPrice } from './../../utils/calcTotalPrice';
import CartItem from './../../components/CartItem/index';
import { stringify } from 'querystring';

export type cartItemType = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  size: number;
  type: string;
  count: number;
  cartID: string;
};

interface CartSliceState {
  totalPrice: number;
  cartItems: cartItemType[];
}

const { cartItems, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  cartItems,
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<cartItemType>) {
      const findItem = state.cartItems.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size == action.payload.size &&
          obj.type == action.payload.type,
      );
      const findSize = state.cartItems.find((obj) => obj.size == action.payload.size);
      const findType = state.cartItems.find((obj) => obj.type == action.payload.type);

      if (findItem?.count) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1, cartID: stringify(action.payload) });
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    minusItem(state, action: PayloadAction<cartItemType>) {
      const findItem = state.cartItems.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size == action.payload.size &&
          obj.type == action.payload.type,
      );

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeItem(state, action: PayloadAction<cartItemType>) {
      state.cartItems = state.cartItems.filter((obj) => obj.cartID !== action.payload.cartID);
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItem, clearItems, minusItem } = cartReducer.actions;

export default cartReducer.reducer;
