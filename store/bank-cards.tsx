import api from "../lib/axios";
import { BankCard } from "../types";
import { create } from "zustand";

type Store = {
  data: BankCard[];
  init: (data: BankCard[]) => void;
  create: (bank: BankCard) => Promise<any>;
  getAll: () => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useBankCardStore = create<Store>()((set) => {
  const url = "/bank-cards";
  return {
    data: [],
    init: (data) => set({ data }),
    create: async (category: BankCard) => {
      return await api.post(url, category);
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
