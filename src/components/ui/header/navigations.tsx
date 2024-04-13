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
    <nav className="max-md:mb-6 max-md:mt-12">
      <ul className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        {links.map(({ path, label }) => (
          <li
            className={cn(
              pathname === path ? "font-semibold" : "font-regular",
              "max-md:text-center",
            )}
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
