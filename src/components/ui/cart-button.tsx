'use client';

import React from 'react';
import Styles from '../../sass/Header.module.scss';
import { ArrowRight, ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useClickAway } from 'react-use';
import Link from 'next/link';

export const CartButton = () => {
  const totalAmount = useCartStore((state) => state?.totalAmount);
  const itemsCount = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  const [popUp, setPopUp] = React.useState<boolean>(false);
  const ref = React.useRef(null);
  const hasItems = itemsCount?.length > 0 && itemsCount;

  const onClick = () => {
    if (!hasItems) {
      setPopUp(true);
    }
  };
  const onClose = () => {
    setPopUp(false);
  };
  useClickAway(ref, () => {
    setPopUp(false);
  });
  const fetchCart = useCartStore.getState().fetchCartItems;
  React.useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  return (
    <>
      <Link href={hasItems ? 'Cart' : ''}>
        <button
          ref={ref}
          onClick={() => onClick()}
          className={loading ? Styles.loading : Styles.cart}>
          <b>{totalAmount}$</b>
          <span></span>
          <div className={Styles.cartBox}>
            <ShoppingCart size={18} color="white" />
            <b>{itemsCount?.length || 0}</b>
          </div>
          <ArrowRight size={20} className={Styles.Visible} />
        </button>
      </Link>
      {popUp && (
        <div className={Styles.popUp}>
          <div className={Styles.popUp__content}>
            <div className={Styles.cross}>
              <p>Cart</p>
              <span onClick={() => onClose()}>
                <X size={24} />
              </span>
            </div>
            <div className={Styles.textPopUp}>
              <h1>Cart is empty</h1>
              <p>Add goods to the bag if you want to add more</p>
            </div>
            <div className={Styles.ShoppingCart}>
              <img
                src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
