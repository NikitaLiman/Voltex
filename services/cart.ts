import { axiosInstance } from './instance';
import { CartDto } from './dto/cart-dto';
import { GetCartItems } from '@/app/api/Cart/route';

export const fetchCart = async (): Promise<CartDto> => {
  const { data } = await axiosInstance.get<CartDto>('/Cart');

  return data;
};

export const updateItemQuanity = async (id: number, quanity: number): Promise<CartDto> => {
  const { data } = await axiosInstance.patch<CartDto>(`/Cart/` + id, { quanity: quanity });

  return data;
};

export const removeCartItem = async (itemId: number): Promise<CartDto> => {
  const { data } = await axiosInstance.delete<CartDto>('/Cart/' + itemId);
  return data;
};

export const addCartItem = async (values: GetCartItems): Promise<CartDto> => {
  const { data } = await axiosInstance.post<CartDto>('/Cart', values);
  return data;
};

export const removeAll = async (): Promise<CartDto> => {
  const { data } = await axiosInstance.delete<CartDto>('/Cart'); // Используем DELETE вместо POST
  return data;
};
