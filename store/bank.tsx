import api from "../lib/axios";
import { Bank } from "../types";
import { create } from "zustand";

type Store = {
  data: Bank[];
  init: (data: Bank[]) => void;
  create: (bank: Bank) => Promise<any>;
  getAll: () => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useBankStore = create<Store>()((set) => {
  const url = "/banks";
  return {
    data: [],
    init: (data) => set({ data }),
    create: async (bank: Bank) => {
      return await api.post(url, bank);
    },
    getAll: async () => {
      return await api.get(url);
    },
    getById: async (id: number) => {
      return await api.get(`${url}/${id}`);
    },
    delete: async (id: number) => {
      return await api.delete(`${url}/${id}`);
    },
  };
});
