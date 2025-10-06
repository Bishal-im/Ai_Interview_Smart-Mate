import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Section } from "lucide-react";
import { dummyInterviews } from "@/constants";  // array of sample interview data
import InterviewCard from "@/components/InterviewCard";

const page = () => {
  return (
    <div>
      {/* whole section  */}
      <>
        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            {/* 1st section  */}
            <h2>
              Get Interview WIth AI-Powered Powered Practice & Test Your
              Potential
            </h2>
            <p className="text-lg">Experience Real Time Interview Practise</p>
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview"> Start an Interview </Link>
            </Button>
          </div>
          {/* 1st section  */}

          <Image
            src="/robot.png"
            alt="robo-dude"
            width={400}
            height={400}
            className="max-sm:hidden"
          ></Image>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Interview</h2>

          <div className="interviews-section">
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Take an Interview</h2>

          <div className="interviews-section">
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        </section>
      </>
    </div>
  );
};

export default page;
