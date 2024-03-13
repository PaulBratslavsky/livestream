import { Link } from "@remix-run/react";
import {
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";

interface TopNavProps {
  id: number;
  logoLink: {
    id: number;
    href: string;
    text: string;
    isEternal: boolean;
  };
  navItem: NavItemProps[];
}

interface NavItemProps {
  id: number;
  href: string;
  text: string;
  isEternal: boolean;
}

function NavItem({ item }: { readonly item: NavItemProps }) {
  const { href, text } = item;
  return (
    <NavigationMenuItem>
      <Link
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        to={href}
      >
        {text}
      </Link>
    </NavigationMenuItem>
  );
}

export function TopNav({ data }: { readonly data: TopNavProps }) {
  const { logoLink, navItem } = data;

  return (
    <div className="container flex items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-800">
      <Link className="flex items-center gap-2" to={logoLink.href}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">{logoLink.text}</span>
      </Link>
      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {navItem
              ? navItem.map((item: NavItemProps) => (
                  <NavItem key={item.id} item={item} />
                ))
              : null}
          </NavigationMenuList>
        </NavigationMenu>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

function MountainIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
