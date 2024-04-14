"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { useBankStore } from "../../../store/bank";
import { UiTable } from "../ui/custom/ui-table";
import { BankCreateForm } from "./create-form";
import PaginationComponent from "../ui/custom/pagination-comp";
import { useSearchParams } from "next/navigation";

export const BanksList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;

  const {
    getAll,
    init,
    initPagination,
    delete: deleteBank,
    data,
    totalElements,
  } = useBankStore();
  const { isLoading } = useQuery(["banks", page], {
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
        edit={<BankCreateForm />}
        keyQ={"banks"}
        deleteF={deleteBank}
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
