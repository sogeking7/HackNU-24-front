"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../../../types";

type Props = {
  links: NavItem[];
  setIsOpen?: (value: boolean) => void;
};
export const Navigations = ({ links, setIsOpen }: Props) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-row items-center gap-10">
        {links.map(({ path, label }) => (
          <li
            className={cn(pathname === path ? "font-semibold" : "font-regular")}
            key={path}
          >
            <Link
              onClick={() => {
                if (setIsOpen) setIsOpen(false);
              }}
              href={path}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
