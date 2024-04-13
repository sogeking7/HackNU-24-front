import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "react-query";
import { ConfirmDialog } from "./confirm-dialog";

export const TableDropdown = ({ id, deleteF, keyQ }: any) => {
  const queryClient = useQueryClient();

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
          <DropdownMenuItem onClick={() => setConfirm(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
