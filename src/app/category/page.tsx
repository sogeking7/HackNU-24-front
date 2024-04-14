import { CategoryList } from "@/components/category/category-list";
import { PanelCategory } from "@/components/category/panel";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="m-container mb-20 mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Categories</h1>
        <div className="flex gap-5">
          <PanelCategory />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList />
      </Suspense>
    </main>
  );
}
