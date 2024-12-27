'use client';

import React from 'react';
import Styles from '../../sass/ProductGroupList.module.scss';
import { Card } from './Card';
import { useIntersection } from 'react-use';
import { useDispatch } from 'react-redux';
import { ActiveId } from '@/Redux/slices/category';

interface Props {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId: number;
}

export const ProductGroupList: React.FC<Props> = ({ title, items, categoryId }) => {
  const dispatch = useDispatch();
  const InterceptionRef = React.useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const intersection = useIntersection(InterceptionRef, {
    threshold: 1,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      dispatch(ActiveId({ title, categoryId }));
    }
  }, [categoryId, title, intersection?.isIntersecting]);
  return (
    <div className={Styles.container} id={title} ref={InterceptionRef}>
      <h1 style={{ padding: '10px 0' }}>{title}</h1>
      <div className={Styles.container__content}>
        {items.map((item) => (
          <Card
            categoryId={categoryId}
            id={item?.id}
            key={item?.id}
            color={items?.[0]?.items?.[0]?.color}
            variation={item?.items?.[0]?.variation}
            name={item?.name}
            price={item?.items?.[0]?.price}
            title={title}
            text={item?.items?.[0]?.describe}
            display={item?.items?.[0]?.display}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};
