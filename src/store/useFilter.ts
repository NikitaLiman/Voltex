import { Filter } from '@prisma/client';
import React from 'react';
import { Api } from '../../services/api-client';
import { useSet } from 'react-use';

interface ReturnProps {
  items: Filter[];
  loading: boolean;
  selectedFilters: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilter = (values: string[] = []): ReturnProps => {
  const [items, setItems] = React.useState<Filter[]>([]);
  const [loading, setloading] = React.useState<boolean>(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>(values));

  React.useEffect(() => {
    async function filterFetch() {
      try {
        setloading(true);
        const filters = await Api.filters.getAll();
        setItems(filters);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
    filterFetch();
  }, []);

  return { items, loading, onAddId: toggle, selectedFilters: selectedIds };
};
