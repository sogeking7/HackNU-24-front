"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { UiTable } from "../ui/custom/ui-table";
import { useCategoryStore } from "../../../store/category";

export const CategoryList = () => {
  const { data, getAll, init, delete: deleteCategory } = useCategoryStore();
  const { isLoading } = useQuery("categories", {
    queryFn: () => getAll(),
    onSuccess: ({ data }) => {
      init(data.content);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return (
    <UiTable
      keyQ={"categories"}
      deleteF={deleteCategory}
      data={data}
      heads={["id", "name", "image"]}
    />
  );
};
