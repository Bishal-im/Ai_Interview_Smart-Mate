import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";
import BackButton from "@/components/BackButton";

const Interview_page = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="mb-6">
        <BackButton />
      </div>

      <h3> Interview Generation</h3>

      <Agent userName={user.name} userId={user.id} type="generate"></Agent>
    </>
  );
};

export default Interview_page;
