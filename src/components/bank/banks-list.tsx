"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { useBankStore } from "../../../store/bank";
import { UiTable } from "../ui/custom/ui-table";

export const BanksList = () => {
  const { getAll, init, delete: deleteBank, data } = useBankStore();
  const { isLoading } = useQuery("banks", {
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
      keyQ={"banks"}
      deleteF={deleteBank}
      data={data}
      heads={["id", "name", "image"]}
    />
  );
};
