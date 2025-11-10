import React from "react";
import { ReactNode } from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Authlayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAunthenticated = await isAuthenticated();

  if (isUserAunthenticated) redirect("/"); // Redirects to homepage if authenticated

  return <div className="auth-layout">{children}</div>;
};

export default Authlayout;
