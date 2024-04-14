import api from "../lib/axios";
import { Bank } from "../types";
import { create } from "zustand";

type Store = {
  data: Bank[];
  totalPages: number;
  totalElements: number;
  initPagination: (totalPages: number, totalElements: number) => void;
  init: (data: Bank[]) => void;
  create: (bank: Bank) => Promise<any>;
  update: (id: number, bank: Bank) => Promise<any>;
  getAll: (page: number, size: number) => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useBankStore = create<Store>()((set) => {
  const url = "/banks";
  return {
    data: [],
    totalPages: 0,
    totalElements: 0,
    initPagination: (totalPages, totalElements) =>
      set({ totalPages, totalElements }),
    init: (data) => set({ data }),
    create: async (bank: Bank) => {
      return await api.post(url, bank);
    },
    update: async (id: number, bank: Bank) => {
      return await api.put(`${url}/${id}`, bank);
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
