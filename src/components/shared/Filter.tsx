'use client';

import React from 'react';
import Styles from '../../sass/Filter.module.scss';
import { FilterCheckBox } from '../ui/filterCheckBox';
import { CheckboxFilterGroup } from './checkbox-filter-group';
import { useFilter } from '@/store/useFilter';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

interface QueryFilterProps {
  items: string[];
}

export const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilterProps, string>;
  const { items, loading, onAddId, selectedFilters } = useFilter(
    searchParams.get('items')?.split(','),
  );

  console.log(loading);
  console.log(items, 'awd111wddw');
  const filteredGroups = items.reduce((acc, cur) => {
    if (!acc[cur.type]) {
      acc[cur.type] = [];
    }
    acc[cur.type].push(cur);

    return acc;
  }, {} as Record<string, { id: number; name: string; type: string }[]>);

  const filterObject = Object.keys(filteredGroups);
  React.useEffect(() => {
    const filters = {
      items: Array.from(selectedFilters),
    };
    const query = qs.stringify(filters, {
      arrayFormat: 'comma',
    });
    router.push(`?${query}`, {
      scroll: false,
    });
    console.log(items, selectedFilters);
  }, [items, selectedFilters]);
  if (loading) {
    return (
      <div className={Styles.container}>
        <h1>Filters</h1>
        {/* Скелетоны для загрузки */}
        {...new Array(22)
          .fill(0)
          .map((_, index) => <div key={index} className={Styles.skeleton}></div>)}
      </div>
    );
  }
  return (
    <div className={Styles.container}>
      {filterObject.map((type, index) => (
        <div key={index} className={Styles.CategoryCheckBox}>
          <CheckboxFilterGroup
            title={type}
            limit={6}
            defaultItems={filteredGroups[type].map((char) => ({
              text: char.name,
              value: char.id,
            }))}
            items={filteredGroups[type].map((char) => ({
              text: char.name,
              value: char.id,
            }))}
            onChangeBox={onAddId}
            selectedIds={selectedFilters}
          />
        </div>
      ))}
    </div>
  );
};
