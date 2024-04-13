"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MyDialog } from "../ui/custom/my-dialog";
import { BankCardsCreateForm } from "./create-form";

export const PanelBankCards = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <MyDialog
        title="Create new"
        open={createDialog}
        setOpen={setCreateDialog}
      >
        <BankCardsCreateForm setOpen={setCreateDialog}/>
      </MyDialog>
      <Button
        variant={"outline"}
        className="px-5"
        onClick={() => setCreateDialog(true)}
      >
        + Create New
      </Button>
    </>
  );
};
