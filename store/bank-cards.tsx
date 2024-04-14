import api from "../lib/axios";
import { BankCard } from "../types";
import { create } from "zustand";

type Store = {
  data: BankCard[];
  totalPages: number;
  totalElements: number;
  initPagination: (totalPages: number, totalElements: number) => void;

  init: (data: BankCard[]) => void;
  create: (bank: BankCard) => Promise<any>;
  update: (id: number, bank: BankCard) => Promise<any>;
  getAll: (page: number, size: number) => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useBankCardStore = create<Store>()((set) => {
  const url = "/bank-cards";
  return {
    data: [],
    totalPages: 0,
    totalElements: 0,
    initPagination: (totalPages, totalElements) =>
      set({ totalPages, totalElements }),

    init: (data) => set({ data }),
    create: async (category: BankCard) => {
      return await api.post(url, category);
    },
    update: async (id: number, category: BankCard) => {
      return await api.put(`${url}/${id}`, category);
    },
    getAll: async (page: number, size: number) => {
      return await api.get(`${url}?page=${page}&size=${size}`);
    },
    getById: async (id: number) => {
      return await api.get(`${url}/${id}`);
    },
    delete: async (id: number) => {
      return await api.delete(`${url}/${id}`);
    },
  };
});
