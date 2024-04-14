import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

import { shorten } from "../../../../lib/utils";

import { TableDropdown } from "./table-dropdown";

export const UiTable = ({ data, heads, deleteF, keyQ, edit }: any) => {
  return (
    <Table>
      <TableHeader>
        {
          <TableRow>
            {heads.map((item: string) => (
              <>
                <TableHead key={item}>{item}</TableHead>
              </>
            ))}
          </TableRow>
        }
      </TableHeader>
      <TableBody>
        {data.map((item: any) => {
          return (
            <TableRow key={item.id!}>
              {heads.map((head: string) => {
                return (
                  <TableCell
                    key={item.id}
                    className={
                      head === "name" &&
                      (keyQ === "banks" || keyQ === "categories")
                        ? "flex items-center gap-3"
                        : ""
                    }
                  >
                    {(keyQ === "banks" || keyQ === "categories") &&
                      head === "name" && (
                        <img
                          alt="logo"
                          className="w-7 h-7 rounded-full"
                          src={item.image}
                        />
                      )}
                    {shorten(item[head], 50) || "null"}
                  </TableCell>
                );
              })}
              <TableCell>
                <TableDropdown data={item} EditComponent={edit} keyQ={keyQ} id={item.id} deleteF={deleteF} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
