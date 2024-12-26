import React from 'react';

import styles from '../../app/page.module.scss';
import { ProductGroupList } from './ProductGroupList';
import { Product } from '@prisma/client';

interface Props {
  categories: {
    id: number;
    name: string;
    product: Product[];
  }[];
}

export const Catalog: React.FC<Props> = ({ categories }) => {
  const hasProducts = categories.some((category) => category.product.length > 0);

  return (
    <div className={styles.Products}>
      {hasProducts ? (
        categories.map((category) =>
          category.product.length > 0 ? (
            <ProductGroupList
              key={category.id}
              title={category.name}
              items={category.product}
              categoryId={category.id}
            />
          ) : null,
        )
      ) : (
        <h6>No products available.</h6>
      )}
    </div>
  );
};
