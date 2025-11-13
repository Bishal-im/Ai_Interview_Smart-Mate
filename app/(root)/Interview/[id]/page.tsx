import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import React from "react";

import Image from "next/image";
import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";
import BackButton from "@/components/BackButton";

const InterviewDetail = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  return (
    <>
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />

            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user.name || ""}
        userId={user.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewDetail;
