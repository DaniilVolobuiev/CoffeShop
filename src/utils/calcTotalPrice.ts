import { cartItemType } from '../redux/slices/CartSlice';

export const calcTotalPrice = (cartItems: cartItemType[]) => {
  return cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
// state.totalPrice = state.cartItems.reduce((sum, obj) => {
//     return obj.price * obj.count + sum;
//   }, 0);
