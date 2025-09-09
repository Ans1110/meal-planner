"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { useState } from "react";

import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  LogOut,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import z from "zod";
import { customErrorMap } from "@/lib/customErrorMap";
z.setErrorMap(customErrorMap);

type RouteGroupeType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const ROUTE_GROUPS: RouteGroupeType[] = [
  {
    group: "Foods Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        href: "/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

const RouteGroup = ({ group, items }: RouteGroupeType) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          variant="ghost"
          className="text-foreground/80 flex w-full justify-between font-normal"
        >
          {group}
          <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ChevronDown />
          </div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="w-full justify-start font-normal"
              variant="link"
              asChild
              key={item.href}
            >
              <Link
                href={item.href}
                className={`flex items-center rounded-md px-5 py-1 transition-all ${pathname == item.href ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div className="bg-background fixed flex z-10 h-13 w-screen items-center justify-between border px-2">
        <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="m-2" asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </Collapsible.Trigger>
        </Collapsible.Root>
        <div className="flex">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex h-9 items-center gap-2 px-2"
                variant="ghost"
              >
                <Avatar className="size-8">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <Avatar className="size-10">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-muted-foreground text-xs">
                    admin@admin.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => {}}>
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed top-0 left-0 z-20 h-dvh"
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
              {ROUTE_GROUPS.map((routeGroup) => (
                <RouteGroup {...routeGroup} key={routeGroup.group} />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
}

export { DashboardLayout };
