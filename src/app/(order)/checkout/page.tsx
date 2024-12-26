'use client';

import React from 'react';
import Styles from '../../../sass/order.module.scss';
import { ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { FormInput } from '@/components/shared/form-components/form-input';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/components/shared/form-components/schemas/checkout-form-schema';
import { SkeletonCheckOut } from '@/components/ui/Skeletons/skeletonCheckout';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';

export default function CheckOut() {
  const item = useCartStore((State) => State.items);
  const totalAmount = useCartStore((State) => State.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      Mail: '',
      FirstName: '',
      SecondName: '',
      Phone: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('Order came well!');

      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error('Error to create Order');
      setSubmitting(false);
    }
  };
  const SkeletonScreen = [...new Array(1)].map((_, index) => <SkeletonCheckOut key={index} />);
  const fetchCart = useCartStore.getState().fetchCartItems;
  React.useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className={Styles.container}>
      <h1>Placing an order</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={Styles.container__content}>
            <div className={Styles.FullInfo}>
              <div className={Styles.UserInfo}>
                <h1>Personal Information</h1>
                <div className={Styles.UserInfo__content}>
                  <div className={Styles.name}>
                    <FormInput
                      name="FirstName"
                      label="FirstName"
                      placeholder="FirstName"
                      required={true}
                    />
                  </div>{' '}
                  <div className={Styles.Mail}>
                    <FormInput name="Mail" placeholder="E-mail" label="E-mail" required={true} />
                  </div>{' '}
                  <div className={Styles.SecondName}>
                    <FormInput label="SecondName" name="SecondName" placeholder="SecondName" />
                  </div>{' '}
                  <div className={Styles.Phone}>
                    <FormInput label="Phone" name="Phone" placeholder="Phone" />
                  </div>
                </div>
              </div>{' '}
            </div>
            <div className={Styles.mainProduct}>
              <div className={Styles.ProductInfo}>
                <div className={Styles.ProductInfo__higher}>
                  <div>
                    {loading ? (
                      <div className={Styles.loadingLenght}></div>
                    ) : (
                      <p>{item?.length} Products in Cart</p>
                    )}
                  </div>
                  <div className={Styles.edit}>
                    {' '}
                    <p>Edit products </p>
                    <span>
                      <ChevronRight color="white" />
                    </span>
                  </div>
                </div>

                <div className={Styles.scroll}>
                  {loading
                    ? SkeletonScreen
                    : item?.map((item, index) => (
                        <div key={index} className={Styles.scroll__product}>
                          <div className={Styles.imageUrl}>
                            <img src={item.variations.color[item.selectedColor].images[0]} alt="" />
                          </div>
                          <div className={Styles.scroll__product__text}>
                            <div>
                              <p>{item.variations.product.name}</p> <p>{item.quanity} item</p>
                            </div>
                            <div>
                              <p>{item.variations.price[item.selectedVariation]} $</p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
              <div className={Styles.totalAmount}>
                <div>
                  {loading ? (
                    <div className={Styles.loadingLenght}></div>
                  ) : (
                    <p>{item?.length} Products in Cart</p>
                  )}
                </div>
                <h2>{loading ? <div className={Styles.loadingTA}></div> : <>{totalAmount} $</>}</h2>
              </div>
              <div className={Styles.submitButton}>
                <button className={submitting ? Styles.submitting : ''} type="submit">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
