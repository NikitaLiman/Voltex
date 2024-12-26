import React from 'react';
import { prisma } from '../../../../../prisma/prisma-client';
import { Container, Header } from '@/components/shared';
import Styles from '@/sass/pagePop.module.scss';
import { TopBarPage } from '@/components/ui/topBar';
import { Sticky } from '@/components/ui/sticky';

export default async function Page({ params: { id } }: { params: { id: number } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      items: {
        include: {
          recommendation: true,
          cartItem: true,
        },
      },
    },
  });

  console.log(product, '[pr');
  return (
    <>
      <Container className={Styles.container}>
        {' '}
        <div className={Styles.container__content}>
          <Sticky
            name={product?.name}
            price={product?.items?.[0]?.price}
            describe={product?.items?.[0]?.describe}
            id={id}
            varitaions={product?.items?.[0]?.variation}
            colorArr={product?.items?.[0]?.color}
            recommendation={product?.items?.[0].recommendation}
            cartItem={product?.items?.[0]?.cartItem?.[0]?.variationsItemId}
          />
        </div>
      </Container>
    </>
  );
}
