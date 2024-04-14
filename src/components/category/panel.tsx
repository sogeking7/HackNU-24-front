"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MyDialog } from "../ui/custom/my-dialog";
import { CategoryCreateForm } from "./create-form";
import { Plus } from "lucide-react";

export const PanelCategory = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <MyDialog
        title="Create new"
        open={createDialog}
        setOpen={setCreateDialog}
      >
        <CategoryCreateForm setOpen={setCreateDialog}/>
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
