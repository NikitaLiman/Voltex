import { Product } from '@prisma/client';
import { axiosInstance } from './instance';

export const Search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>('/Products/search', { params: { query } });
  return data;
};
