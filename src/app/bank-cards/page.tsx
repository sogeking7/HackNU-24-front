import { BankCardsList } from "@/components/bank-cards/bank-cards-list";
import { PanelBankCards } from "@/components/bank-cards/panel";

export default function Page() {
  return (
    <main className="m-container mb-20 mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Bank Cards</h1>
        <div className="flex gap-5">
          <PanelBankCards />
        </div>
      </div>
      <BankCardsList />
    </main>
  );
}
