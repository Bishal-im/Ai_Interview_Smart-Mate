import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";

const Rootlayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAunthenticated = await isAuthenticated();

  if (!isUserAunthenticated) {
    redirect("/dashboard");
  }

  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h2 className="text-primary-100">SmartMate</h2>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex flex-col items-end max-sm:hidden">
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>
            </div>
          )}
          <LogoutButton />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Rootlayout;
