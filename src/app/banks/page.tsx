import { BanksList } from "@/components/bank/banks-list";
import { PanelBank } from "@/components/bank/panel";

export default function Page() {
  return (
    <main className="m-container mb-20 mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Banks</h1>
        <div className="flex gap-5">
          <PanelBank />
        </div>
      </div>
      <BanksList />
    </main>
  );
}
