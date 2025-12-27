// import Agent from "@/components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { redirect } from "next/navigation";
// import React from "react";
// import BackButton from "@/components/BackButton";

// const Interview_page = async () => {
//   const user = await getCurrentUser();

//   if (!user || !user.id) {
//     redirect("/sign-in");
//   }

//   return (
//     <>
//       <div className="mb-6">
//         <BackButton />
//       </div>

//       <h3> Interview Generation</h3>

//       <Agent userName={user.name} userId={user.id} type="generate"></Agent>
//     </>
//   );
// };

// export default Interview_page;

//new

import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
// import InterviewSetupForm from "@/components/InterviewSetupForm";
import InterviewSetupForm from "@/components/InterviewSetupForm";
const InterviewPage = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent">
            Create New Interview
          </span>
        </h1>
        <p className="text-light-100/70">
          Fill in the details to generate your AI interview questions
        </p>
      </div>

      {/* Form Component */}
      <InterviewSetupForm userId={user.id} />
    </section>
  );
};

export default InterviewPage;
