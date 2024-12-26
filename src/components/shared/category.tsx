'use client';

import React from 'react';
import Styles from '../../sass/category.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ActiveId } from '@/Redux/slices/category';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
}

export const CategoryBar: React.FC<Props> = ({ categories }) => {
  const dispatch = useDispatch();

  const CategoryId = useSelector((State: any) => State.category.activeId);

  const HandleChange = (id: number, name: string) => {
    dispatch(ActiveId({ categoryId: id }));
    window.location.hash = name;
  };

  return (
    <section className={Styles.container}>
      {' '}
      {categories.map(({ name, id }, index: number) => (
        <ul key={index}>
          <li
            className={CategoryId === id ? Styles.active : ''}
            onClick={() => HandleChange(id, name)}
            key={index}>
            <a href={`/#${name}`}>{name}</a>
          </li>
        </ul>
      ))}
    </section>
  );
};
