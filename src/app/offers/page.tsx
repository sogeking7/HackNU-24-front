import { OffersList } from "@/components/offer/offers-list";
import { PanelOffer } from "@/components/offer/panel";

export default function Page() {
  return (
    <main className="m-container mb-20 mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Cashback Offers</h1>
        <div className="flex gap-5">
          <PanelOffer />
        </div>
      </div>
      <OffersList />
    </main>
  );
}
