import { create } from 'zustand';
import { Api } from '../../services/api-client';
import { getCartDetails, ICartItem } from '../../lib/getCartDetails';
import { GetCartItems } from '@/app/api/Cart/route';

export interface CartState {
  activeColor: number;
  activeVariation: number;
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuanity: (id: number, quanity: number) => Promise<void>;
  addCartItem: (values: GetCartItems) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  removeAll: () => Promise<void>;
  addActive: (index: number) => void;
  addActiveVar: (index: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  activeColor: 0,
  activeVariation: 0,
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],

  addActive(index: number) {
    set({ activeColor: index });
    console.log(this.activeColor);
  },
  addActiveVar(index: number) {
    set({ activeVariation: index });
    console.log(this.activeVariation);
  },
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      console.log(data);
      set(getCartDetails(data));
    } catch (error: any) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
      console.log(data);
    } catch (error: any) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeAll: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeAll();
      set(getCartDetails(data));
      console.log(data);
    } catch (error: any) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeAllItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeAllItems();
      set(getCartDetails(data));
      console.log(data);
    } catch (error: any) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuanity: async (id: number, quantity: number) => {
    console.log('Sending PATCH request:', { quanity: quantity });
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuanity(id, quantity);
      set(getCartDetails(data));
      console.log(data);
    } catch (error: any) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (value: GetCartItems) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(value);
      set(getCartDetails(data));
      console.log(data);
    } catch (error: any) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));