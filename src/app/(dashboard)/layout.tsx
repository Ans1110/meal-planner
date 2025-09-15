import { auth } from "@/lib/auth";
import { DashboardLayout } from "./_components/dashboard-layout";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
