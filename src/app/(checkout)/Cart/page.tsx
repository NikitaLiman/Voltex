'use client';

import { Container } from '@/components/shared';
import Styles from '../../../sass/Checkout.module.scss';
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCart = useCartStore.getState().fetchCartItems;

  React.useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const UpdateItemAmount = async (id: number, quantity: number) => {
    await useCartStore.getState().updateItemQuanity(id, quantity);
    await fetchCart();
  };
  const removeItem = async (id: number) => {
    await useCartStore.getState().removeCartItem(id);
    await fetchCart();
  };
  const removeAll = async () => {
    await useCartStore.getState().removeAll();
    await fetchCart();
  };
  console.log(items, 'awd');
  return (
    <Container className={Styles.container}>
      <div className={Styles.container__higherBlock}>
        <p>Cart</p>
        <span>{items?.length} Product</span>
      </div>
      <div className={Styles.container__main}>
        <div className={Styles.container__main__productBlock}>
          {' '}
          <div className={Styles.Delete}>
            <button
              onClick={() => {
                removeAll();
              }}>
              <Trash2 size={20} /> Delete All
            </button>
          </div>
          {items.length > 0 ? (
            items?.map((item, index) => (
              <div key={index} className={Styles.ProductInfo}>
                <div className={Styles.imageUrl}>
                  <img src={item?.variations?.color?.[item.selectedColor]?.images?.[0]} alt="" />
                </div>
                <div className={Styles.ProductInfo__cont}>
                  <div className={Styles.boxInfo}>
                    <div className={Styles.boxInfo__content}>
                      <div className={Styles.idShow}>
                        <p>
                          {item.variations.product.name}{' '}
                          {item.variations.color[item.selectedColor].nameColor}{' '}
                          {item.variations.variation[item.selectedVariation]}
                        </p>
                        <span>id: {item.id}</span>
                      </div>
                      <div className={Styles.price}>
                        <p>{item?.variations.price[item.selectedVariation]} $</p>
                      </div>
                    </div>
                  </div>{' '}
                  <div className={Styles.ProductInfo__cont__Configuration}>
                    {' '}
                    <button onClick={() => removeItem(item.id)}>
                      <Trash2 /> Delete
                    </button>
                    <div className={Styles.controller}>
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
                  </div>
                </div>{' '}
              </div>
            ))
          ) : (
            <div className={Styles.ProductInfo}>
              <div className={Styles.deletedItem}>
                <h1>Cart is empty</h1>
                <p>
                  Go to the main page and browse through the search or catalog to find everything
                  you need.
                </p>
                <Link href="/">
                  <button>Route to main</button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className={Styles.container__main__TotalInformation}>
          <div className={Styles.CheckoutBtn}>
            <Link href={'checkout'}>
              <button>Go to checkout</button>
            </Link>
          </div>
          <div className={Styles.priceProducts}>
            <p>{items?.length} product on price</p>
            <span>{totalAmount} $</span>
          </div>
          <div className={Styles.totalPrice}>
            <p>Total</p>
            <span>{totalAmount} $</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
