"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useBankCardStore } from "../../../store/bank-cards";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BankCard, Offer } from "../../../types";
import { useCategoryStore } from "../../../store/category";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useOfferStore } from "../../../store/offer";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../ui/custom/date-picker-range";
import { formatDate } from "../../../lib/utils";

export const OfferCreateForm = ({ setOpen }: any) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [bankCardId, setBankCardId] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const { create } = useOfferStore();
  const {
    init: initBankCards,
    getAll: getAllBankCards,
    data: bankCards,
  } = useBankCardStore();
  const {
    getAll: getAllCategories,
    init: initCategories,
    data: categories,
  } = useCategoryStore();

  const { isLoading: isCategoryLoading } = useQuery("categories", {
    queryFn: () => getAllCategories(),
    onSuccess: ({ data }) => {
      initCategories(data.content);
    },
    retry: false,
  });

  const { isLoading: isBankCardLoading } = useQuery("bank-cards", {
    queryFn: () => getAllBankCards(),
    onSuccess: ({ data }) => {
      const formatted = data.content.map((i: BankCard) => {
        //@ts-ignore
        return { id: i.id, name: i.name, bank_name: i.bank.name };
      });

      initBankCards(formatted);
    },
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (newData: Offer) => {
      return create(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });

  const onSubmit = (data: any) => {
    if (!date?.from || !date?.to) return;
    if (!bankCardId || !categoryId) return;
    const dto = {
      ...data,
      bankCardId: parseInt(bankCardId),
      categoryId: parseInt(categoryId),
      dateFrom: formatDate(date.from),
      dateTo: formatDate(date.to),
    };
    mutation.mutate(dto);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        {isCategoryLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select
            value={categoryId}
            onValueChange={(val) => setCategoryId(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {isBankCardLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select
            value={bankCardId}
            onValueChange={(val) => setBankCardId(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a bank card" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bankCards.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <Input placeholder="Percentage" required {...register("percentage")} />
        <Input placeholder="Conditions" required {...register("conditions")} />

        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  );
};
