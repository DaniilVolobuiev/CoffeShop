import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.userReducer);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
