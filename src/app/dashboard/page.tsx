import type { Metadata } from "next";
import { isStaff } from "@/lib/auth";
import StaffGate from "@/components/StaffGate";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = {
  title: "Staff Dashboard",
  robots: { index: false },
};

export default async function DashboardPage() {
  const authed = await isStaff();
  return authed ? <DashboardClient /> : <StaffGate />;
}
