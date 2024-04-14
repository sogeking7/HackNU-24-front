"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OfferCreateForm } from "./create-form";
import { MyDialog } from "../ui/custom/my-dialog";
import { Plus } from "lucide-react";

export const PanelOffer = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <MyDialog
        title="Create new"
        open={createDialog}
        setOpen={setCreateDialog}
      >
        <OfferCreateForm setOpen={setCreateDialog} />
      </MyDialog>
      <Button
        variant={"outline"}
        className="px-5"
        onClick={() => setCreateDialog(true)}
      >
        <Plus size={20} className="mr-3" /> Create New
      </Button>
    </>
  );
};
