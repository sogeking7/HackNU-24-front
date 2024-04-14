"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { UiTable } from "../ui/custom/ui-table";
import { useCategoryStore } from "../../../store/category";
import { CategoryCreateForm } from "./create-form";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "../ui/custom/pagination-comp";

export const CategoryList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;

  const {
    data,
    getAll,
    init,
    initPagination,
    totalElements,

    delete: deleteCategory,
  } = useCategoryStore();
  const { isLoading } = useQuery(["categories", page], {
    queryFn: () => getAll(+page, 20),
    onSuccess: ({ data }) => {
      init(data.content);
      initPagination(data.totalPages, data.totalElements);
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
    <>
      <h2>
        <span className="text-gray-500">Total Count:</span>{" "}
        <b>{totalElements}</b>
      </h2>
      <UiTable
        edit={<CategoryCreateForm />}
        keyQ={"categories"}
        deleteF={deleteCategory}
        data={data}
        heads={["id", "name", "image"]}
      />
      <PaginationComponent
        currentPage={+page + 1}
        pageSize={20}
        itemCount={totalElements}
      />
    </>
  );
};
