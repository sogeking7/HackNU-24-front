import api from "../lib/axios";
import { Offer } from "../types";
import { create } from "zustand";

type Store = {
  data: Offer[];
  init: (data: Offer[]) => void;
  create: (bank: Offer) => Promise<any>;
  getAll: () => Promise<any>;
  getById: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
};

export const useOfferStore = create<Store>()((set) => {
  const url = "/offers";
  return {
    data: [],
    init: (data) => set({ data }),
    create: async (offer: Offer) => {
      return await api.post(url, offer);
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
