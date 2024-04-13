import api from "../lib/axios";
import { Category } from "../types";
import { create } from "zustand";

type Store = {
  data: Category[];
  init: (data: Category[]) => void;
  create: (category: Category) => Promise<any>;
  getAll: () => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useCategoryStore = create<Store>()((set) => {
  const url = "/categories";
  return {
    data: [],
    init: (data) => set({ data }),
    create: async (category: Category) => {
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
