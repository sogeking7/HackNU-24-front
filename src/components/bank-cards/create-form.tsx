"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useBankCardStore } from "../../../store/bank-cards";
import { useBankStore } from "../../../store/bank";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { BankCard } from "../../../types";

export const BankCardsCreateForm = ({
  setOpen,
  edit = false,
  data: Idata,
}: any) => {
  const queryClient = useQueryClient();

  const { create, update } = useBankCardStore();
  const { getAll, init, data } = useBankStore();

  const [bankId, setBankId] = useState<string | undefined>(() => {
    return Idata?.bankId ? String(Idata?.bankId) : undefined;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: Idata?.name,
      comment: Idata?.comment,
      image: Idata?.image,
    },
  });

  const { isLoading: isBanksLoading } = useQuery("banks", {
    queryFn: () => getAll(0, 100),
    onSuccess: ({ data }) => {
      init(data.content);
    },
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (newData: BankCard) => {
      if (edit) {
        return update(Idata.id, newData);
      }
      return create(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-cards"] });
    },
  });

  const onSubmit = async (data: any) => {
    if (!bankId) return;
    const dto = { ...data, bankId };
    mutation.mutate(dto);
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        {isBanksLoading && <Skeleton className="h-2 w-full" />}
        {data && (
          <Select value={bankId} onValueChange={(val) => setBankId(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((item) => {
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

        <Input placeholder="Name" required {...register("name")} />
        <Input placeholder="Comment" required {...register("comment")} />
        <Input placeholder="Image Link" required {...register("image")} />
      </div>
      <Button type="submit" className="w-full">
        {edit ? "Edit" : "Create"}
      </Button>
    </form>
  );
};
