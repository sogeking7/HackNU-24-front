import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "react-query";
import { ConfirmDialog } from "./confirm-dialog";
import { MyDialog } from "./my-dialog";
import { CategoryCreateForm } from "@/components/category/create-form";
import { OfferCreateForm } from "@/components/offer/create-form";
import { BankCardsCreateForm } from "@/components/bank-cards/create-form";
import { BankCreateForm } from "@/components/bank/create-form";

export const TableDropdown = ({ data, id, deleteF, keyQ }: any) => {
  const queryClient = useQueryClient();

  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return deleteF(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyQ] });
    },
  });

  const handleDelete = async () => {
    mutation.mutate(id);
  };

  return (
    <>
      <MyDialog title="Edit" open={edit} setOpen={setEdit}>
        {keyQ === "categories" && <CategoryCreateForm setOpen={setEdit} edit data={data} />}
        {keyQ === "offers" && <OfferCreateForm setOpen={setEdit} edit data={data} />}
        {keyQ === "banks" && <BankCreateForm setOpen={setEdit} edit data={data} />}
        {keyQ === "bank-cards" && <BankCardsCreateForm setOpen={setEdit} edit data={data} />}
      </MyDialog>
      <ConfirmDialog
        open={confirm}
        setOpen={setConfirm}
        action={handleDelete}
      />
      <DropdownMenu
        open={openDropdown}
        onOpenChange={(val) => setOpenDropdown(val)}
      >
        <DropdownMenuTrigger>
          <EllipsisVertical size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEdit(true)}>
            <Edit className="mr-3" size={14} /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirm(true)}>
            <Trash className="mr-3" size={14} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
