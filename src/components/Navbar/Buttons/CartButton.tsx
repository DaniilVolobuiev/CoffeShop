import { Link } from 'react-router-dom';
import styles from './cartButton.module.scss';
import { useAppSelector } from '../../../redux/hooks';
import IconForNav from '../../../images/iconForNav.svg';
import { cartItemType } from '../../../redux/slices/CartSlice';
export const CartButton: React.FC = () => {
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice);
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const totalCount = cartItems.reduce((sum: number, item: cartItemType) => sum + item.count, 0);

  return (
    <>
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <button className={styles.cart}>
          <div className={styles.price}>
            <span>{totalPrice}</span>
            <span>$</span>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.quantity}>
            <img src={IconForNav} /> <span>{totalCount}</span>
          </div>
        </button>
      </Link>
    </>
  );
};
