import React from 'react';
import Styles from '../../sass/TopBar.module.scss';
import { CategoryBar } from '@/components/shared/category';
import { Container } from './container';
import { prisma } from '../../../prisma/prisma-client';

export const TopBar = async () => {
  const categories = await prisma.category.findMany({
    include: {
      product: {
        include: {
          items: true,
        },
      },
    },
    take: 7,
  });
  return (
    <Container className={Styles.container}>
      <CategoryBar categories={categories.filter((category) => category.product.length > 0)} />
    </Container>
  );
};
