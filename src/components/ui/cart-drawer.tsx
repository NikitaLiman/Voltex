'use client';
import React from 'react';
import Styles from '../../sass/SassComp/CartDrawer.module.scss';
import { Minus, Plus } from 'lucide-react';
import { ICartItem } from '../../../lib/getCartDetails';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import Skeleton from './Skeletons/skeleton';
import Link from 'next/link';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  active: number;
  id: number;
  selectedPrice: number;
  activeVar: number;
}

export const CartDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, active, id, activeVar }) => {
  const [item, setItem] = React.useState<ICartItem[]>([]);

  const fetchCart = async () => {
    await useCartStore.getState().fetchCartItems();
    const itemFetch = useCartStore.getState().items;
    setItem(itemFetch);
  };

  const loading = useCartStore((state) => state.loading);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const UpdateItemAmount = async (id: number, quantity: number) => {
    await useCartStore.getState().updateItemQuanity(id, quantity);
    fetchCart();
  };

  const firstItem = id;
  const addProduct = async () => {
    try {
      const existingItem = item?.find((cartItem) => cartItem.id === firstItem);

      if (existingItem) {
        await UpdateItemAmount(existingItem.id, existingItem.quanity + 1);
      } else {
        await addCartItem({
          variationsItemId: firstItem,
          selectedColor: active,
          selectedVariation: activeVar,
        });
        await fetchCart();
        toast.success('Added To Cart');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      addProduct();
      fetchCart();
    }
  }, [isOpen]);

  const SkeletonScreen = [...new Array(1)].map((_, index) => <Skeleton key={index} />);

  const CurrentItem = React.useMemo(() => {
    return item?.find((cartItem) => cartItem.variationItemId === firstItem);
  }, [item, firstItem]);

  const CurrentImage = CurrentItem?.variations?.color?.[active]?.images?.[0];
  const CurrentName = CurrentItem?.variations?.product?.name;
  const CurrentVar = CurrentItem?.variations?.variation?.[activeVar];
  const CurrentPrice = CurrentItem?.variations?.price[activeVar];
  const CurrentColor = CurrentItem?.variations?.color[active].nameColor;
  return (
    <div className={`${Styles.container} ${isOpen ? Styles.open : ''} `} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${Styles.drawer} ${isOpen ? Styles.open : ''}`}>
        <div onClick={onClose} className={Styles.closeButton}>
          &times;
        </div>
        <div className={Styles.drawer__content}>
          {' '}
          <div className={Styles.CartDrawerContainer}>
            <p>The product has been added to the cart</p>
            {loading ? (
              SkeletonScreen
            ) : (
              <>
                <div className={Styles.CartDrawerContainer__info}>
                  <div className={Styles.LogoImg}>
                    <img src={CurrentImage} alt="" />
                  </div>
                  <div className={Styles.modelInfo}>
                    <p>
                      {CurrentName} {CurrentVar} {CurrentColor}
                    </p>
                  </div>
                  <div className={Styles.Price}>
                    <h2>{CurrentPrice || item?.[0]?.variations?.price?.[0]} $</h2>
                    {item?.map(
                      (item, index) =>
                        item.variationItemId === firstItem && (
                          <div key={index} className={Styles.controller}>
                            <button
                              onClick={() => UpdateItemAmount(item.id, item.quanity - 1)}
                              className={Styles.Minus}>
                              {' '}
                              <Minus />
                            </button>
                            <span>{item.quanity}</span>
                            <button
                              onClick={() => UpdateItemAmount(item.id, item.quanity + 1)}
                              className={Styles.Plus}>
                              <Plus />
                            </button>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={Styles.CartDrawerContainer__buttons}>
              <button onClick={onClose}>Continue</button>
              <div className={Styles.CartDrawerContainer__buttons__mainBTN}>
                <Link href="/Cart">
                  <button className={Styles.GTC}>Go to Cart</button>
                </Link>
                <Link href="/checkout">
                  <button className={Styles.PAO}>Place an order</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
