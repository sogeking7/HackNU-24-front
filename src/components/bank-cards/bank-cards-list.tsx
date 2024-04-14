"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { UiTable } from "../ui/custom/ui-table";
import { useBankCardStore } from "../../../store/bank-cards";
import { BankCard } from "../../../types";
import { BankCardsCreateForm } from "./create-form";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "../ui/custom/pagination-comp";

export const BankCardsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;

  const {
    init,
    data,
    getAll,
    initPagination,
    totalElements,
    delete: deleteBankCard,
  } = useBankCardStore();
  const { isLoading } = useQuery(["bank-cards", page], {
    queryFn: () => getAll(+page, 20),
    onSuccess: ({ data }) => {
      const formatted = data.content.map((i: BankCard) => {
        //@ts-ignore
        return {
          id: i.id,
          name: i.name,
          bank_name: i.bank.name,
          bankId: i.bank.id,
          image: i.image,
          comment: i.comment,
        };
      });

      init(formatted);
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
        edit={<BankCardsCreateForm />}
        keyQ={"bank-cards"}
        deleteF={deleteBankCard}
        data={data}
        heads={["id", "name", "bankId", "bank_name", "comment", "image"]}
      />
      <PaginationComponent
        currentPage={+page + 1}
        pageSize={20}
        itemCount={totalElements}
      />
    </>
  );
};
