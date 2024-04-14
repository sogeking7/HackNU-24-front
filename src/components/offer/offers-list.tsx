"use client";

import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { useOfferStore } from "../../../store/offer";
import { UiTable } from "../ui/custom/ui-table";
import { OfferCreateForm } from "./create-form";
import PaginationComponent from "../ui/custom/pagination-comp";
import { useSearchParams } from "next/navigation";

export const OffersList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;

  const {
    getAll,
    init,
    data,
    initPagination,
    totalElements,
    delete: deleteOffer,
  } = useOfferStore();

  const { isLoading } = useQuery(["offers", page], {
    queryFn: () => getAll(+page, 20),
    onSuccess: ({ data }) => {
      // @ts-ignore
      const formatted = data.content.map((item) => {
        return {
          ...item,
          bankName: item.bankCard.name,
          categoryName: item.category?.name,
          bankNameId: item.bankCard.id,
          categoryId: item.category?.id,
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
        edit={<OfferCreateForm />}
        keyQ={"offers"}
        deleteF={deleteOffer}
        data={data}
        heads={[
          "id",
          "bankName",
          "bankNameId",
          "categoryName",
          "categoryId",
          "percentage",
          "conditions",
          "dateFrom",
          "dateTo",
        ]}
      />
      <PaginationComponent
        currentPage={+page + 1}
        pageSize={20}
        itemCount={totalElements}
      />
    </>
  );
};
