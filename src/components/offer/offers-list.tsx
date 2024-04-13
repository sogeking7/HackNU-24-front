"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { useOfferStore } from "../../../store/offer";
import { UiTable } from "../ui/custom/ui-table";

export const OffersList = () => {
  const { getAll, init, data, delete: deleteOffer } = useOfferStore();

  const { isLoading } = useQuery("offers", {
    queryFn: () => getAll(),
    onSuccess: ({ data }) => {
      // @ts-ignore
      const formatted = data.content.map((item) => {
        return {
          ...item,
          bankName: item.bankCard.name,
          categoryName: item.category?.name,
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
      keyQ={"offers"}
      deleteF={deleteOffer}
      data={data}
      heads={[
        "id",
        "bankName",
        "categoryName",
        "percentage",
        "conditions",
        "dateFrom",
        "dateTo",
      ]}
    />
  );
};
