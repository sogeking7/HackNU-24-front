"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { Navigations } from "./navigations";
import { NavItem } from "../../../types";

export const MobileSidebar = ({ links }: { links: NavItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <Navigations links={links} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};
