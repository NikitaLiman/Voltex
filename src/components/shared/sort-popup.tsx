import React from 'react';
import Styles from '../../sass/SortPop.module.scss';
import { ArrowUpDown } from 'lucide-react';

export const Sort = () => {
  return (
    <div className={Styles.container}>
      <ArrowUpDown size={16} color="white" />
      <div className={Styles.container__text}>
        <b>Sort:</b>
        <p>Popularity</p>
      </div>
    </div>
  );
};
