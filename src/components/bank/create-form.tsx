"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useBankStore } from "../../../store/bank";
import { useMutation, useQueryClient } from "react-query";
import { Bank } from "../../../types";

export const BankCreateForm = ({ setOpen, edit = false, data }: any) => {
  const queryClient = useQueryClient();

  const { create, update } = useBankStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name,
      image: data?.image,
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: Bank) => {
      if (edit) {
        return update(data.id, newData);
      }
      return create(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        <Input placeholder="Name" required {...register("name")} />
        <Input placeholder="Image Link" required {...register("image")} />
      </div>
      <Button type="submit" className="w-full">
        {edit ? "Edit" : "Create"}
      </Button>
    </form>
  );
};
