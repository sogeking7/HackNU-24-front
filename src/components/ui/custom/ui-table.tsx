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

export const UiTable = ({ data, heads, deleteF, keyQ }: any) => {
  return (
    <Table>
      <TableHeader>
        {
          <TableRow>
            {heads.map((item: string) => (
              <TableHead key={item}>{item}</TableHead>
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
                  <TableCell key={item.id}>
                    {shorten(item[head], 50) || "null"}
                  </TableCell>
                );
              })}
              <TableCell>
                <TableDropdown keyQ={keyQ} id={item.id} deleteF={deleteF} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
