import api from "../lib/axios";
import { Category } from "../types";
import { create } from "zustand";

type Store = {
  data: Category[];
  totalPages: number;
  totalElements: number;
  initPagination: (totalPages: number, totalElements: number) => void;

  init: (data: Category[]) => void;
  create: (category: Category) => Promise<any>;
  update: (id: number, category: Category) => Promise<any>;
  getAll: (page: number, size: number) => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useCategoryStore = create<Store>()((set) => {
  const url = "/categories";
  return {
    data: [],
    totalPages: 0,
    totalElements: 0,
    initPagination: (totalPages, totalElements) =>
      set({ totalPages, totalElements }),

    init: (data) => set({ data }),
    create: async (category: Category) => {
      return await api.post(url, category);
    },
    update: async (id: number, category: Category) => {
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
