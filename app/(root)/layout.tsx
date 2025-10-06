import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Rootlayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAunthenticated = await isAuthenticated();

  if (!isUserAunthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h2 className="text-primary-100">SmartMate</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Rootlayout;
