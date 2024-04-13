import { NavItem } from "../../../../types";
import Image from "next/image";
import Link from "next/link";
import { Navigations } from "./navigations";

export const Header = () => {
  const links: NavItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Bank Cards",
      path: "/bank-cards",
    },
    {
      label: "Cashback Offers",
      path: "/offers",
    },
    {
      label: "Banks",
      path: "/banks",
    },
    {
      label: "Categories",
      path: "/category",
    },
  ];

  return (
    <header className="h-[72px] sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="w-[60px] text-2xl font-bold uppercase">
          <Image alt="logo" width={50} height={50} src="/logo.jpg" />
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <Navigations links={links} />
        </div>
      </div>
    </header>
  );
};
