"use client";

import { BankCreateForm } from "@/components/bank/create-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MyDialog } from "../ui/custom/my-dialog";

export const PanelBank = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <MyDialog
        title="Create new"
        open={createDialog}
        setOpen={setCreateDialog}
      >
        <BankCreateForm setOpen={setCreateDialog} />
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
