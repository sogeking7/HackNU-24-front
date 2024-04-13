"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCategoryStore } from "../../../store/category";
import { useMutation, useQueryClient } from "react-query";
import { Category } from "../../../types";
export const CategoryCreateForm = ({ setOpen }: any) => {
  const queryClient = useQueryClient();

  const { create } = useCategoryStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (newData: Category) => {
      return create(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        <Input placeholder="Name" required {...register("name")} />
        <Input placeholder="Image Link" required {...register("image")} />
      </div>
      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  );
};
