export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Bank = {
  id?: number;
  name: string;
  image: string;
};

export type BankCard = {
  id?: number;
  name: string;
  bankName?: string;
  bankId: number;
  image: string;
  comment: string;
};

export type Offer = {
  id?: number;
  bankName?: string;
  bankCardId: number;
  categoryName?: string | null;
  categoryId: number | null;
  percentage: number;
  conditions: string;
  dateFrom: string;
  dateTo: string;
};

export type Category = {
  id?: number;
  name: string;
  image: string;
};

export type NavItem = {
  label: string;
  path: string;
};

export type Token = string | null;
