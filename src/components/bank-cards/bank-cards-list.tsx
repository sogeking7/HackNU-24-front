"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { UiTable } from "../ui/custom/ui-table";
import { useBankCardStore } from "../../../store/bank-cards";
import { BankCard } from "../../../types";

export const BankCardsList = () => {
  const { init, data, getAll, delete: deleteBankCard } = useBankCardStore();
  const { isLoading } = useQuery("bank-cards", {
    queryFn: () => getAll(),
    onSuccess: ({ data }) => {
      const formatted = data.content.map((i: BankCard) => {
        //@ts-ignore
        return {
          id: i.id,
          name: i.name,
          bank_name: i.bank.name,
          comment: i.comment,
        };
      });

      init(formatted);
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
      keyQ={"bank-cards"}
      deleteF={deleteBankCard}
      data={data}
      heads={["id", "name", "bank_name", "comment"]}
    />
  );
};
