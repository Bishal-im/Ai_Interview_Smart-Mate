import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  // If user is logged in, redirect to homepage
  if (user) {
    redirect("/");
  }

  return <DashboardClient />;
};

export default DashboardPage;
