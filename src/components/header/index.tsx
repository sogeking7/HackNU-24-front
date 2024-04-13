import { NavItem } from "../../../types";
import { Logo } from "../logo";
import { MobileSidebar } from "./mobile-sidebar";
import { Navigations } from "./navigations";

export const Header = () => {
  const links: NavItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Offers",
      path: "/offers",
    },
    {
      label: "Banks",
      path: "/banks",
    },
  ];

  return (
    <header className="h-[72px] sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6 md:gap-10">
          <div className="max-md:!hidden">
            <Navigations links={links} />
          </div>
          <div className="md:!hidden">
            <MobileSidebar links={links} />
          </div>
        </div>
      </div>
    </header>
  );
};
