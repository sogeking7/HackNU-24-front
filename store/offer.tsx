import api from "../lib/axios";
import { Offer } from "../types";
import { create } from "zustand";

type Store = {
  data: Offer[];
  totalPages: number;
  totalElements: number;
  initPagination: (totalPages: number, totalElements: number) => void;
  init: (data: Offer[]) => void;
  create: (offer: Offer) => Promise<any>;
  update: (id: number, offer: Offer) => Promise<any>;
  getAll: (page: number, size: number) => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useOfferStore = create<Store>()((set) => {
  const url = "/offers";
  return {
    data: [],
    totalPages: 0,
    totalElements: 0,
    initPagination: (totalPages, totalElements) =>
      set({ totalPages, totalElements }),

    init: (data) => set({ data }),
    create: async (offer: Offer) => {
      return await api.post(url, offer);
    },
    update: async (id: number, offer: Offer) => {
      return await api.put(`${url}/${id}`, offer);
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
