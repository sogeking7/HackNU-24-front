import { User } from "../types";
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  id: User["id"] | null;
  firstName: User["firstName"] | null;
  lastName: User["lastName"] | null;
  email: User["email"] | null;
  initUser: (user: User) => void;
};

export const useUserStore = create<Store>()(
  // devtools(
  (set) => {
    return {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      initUser: (user) => set({ ...user }),
    };
  }
  // ),
);
