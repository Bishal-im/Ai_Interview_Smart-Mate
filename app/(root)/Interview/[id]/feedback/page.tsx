import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  // Score color determination
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  const scoreColor = getScoreColor(feedback?.totalScore || 0);
  const scorePercentage = feedback?.totalScore || 0;

  return (
    <section className="section-feedback">
      {/* Header with animated background */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-200/10 rounded-full blur-[100px] -z-10" />

        <div className="flex flex-col items-center gap-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-200/10 border border-primary-200/30 rounded-full backdrop-blur-sm">
            <svg
              className="w-4 h-4 text-primary-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-primary-200">
              Interview Complete
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold max-sm:text-3xl">
            <span className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent">
              Interview Feedback
            </span>
          </h1>

          <p className="text-xl text-light-100/70 capitalize">
            {interview.role} Position
          </p>
        </div>
      </div>

      {/* Score Card */}
      <div className="card-border max-w-4xl mx-auto">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Score Circle */}
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-dark-300"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - scorePercentage / 100)}`}
                  className={scoreColor}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${scoreColor}`}>
                  {feedback?.totalScore}
                </span>
                <span className="text-light-100/60 text-sm">out of 100</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-3">
                {/* Date */}
                <div className="flex items-center gap-3 p-3 bg-dark-300/50 rounded-xl border border-light-800/30">
                  <div className="w-10 h-10 rounded-lg bg-primary-200/10 flex items-center justify-center">
                    <Image
                      src="/calendar.svg"
                      width={20}
                      height={20}
                      alt="calendar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-light-100/60">
                      Completed On
                    </span>
                    <span className="text-sm font-medium">
                      {feedback?.createdAt
                        ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="flex items-center gap-3 p-3 bg-dark-300/50 rounded-xl border border-light-800/30">
                  <div className="w-10 h-10 rounded-lg bg-primary-200/10 flex items-center justify-center">
                    <Image src="/star.svg" width={20} height={20} alt="star" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-light-100/60">
                      Overall Impression
                    </span>
                    <span className={`text-sm font-bold ${scoreColor}`}>
                      {feedback?.totalScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Badge */}
              <div className="flex items-center gap-2 p-3 bg-primary-200/5 rounded-xl border border-primary-200/20">
                <svg
                  className="w-5 h-5 text-primary-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-primary-200">
                  {scorePercentage >= 80
                    ? "Excellent Performance"
                    : scorePercentage >= 60
                      ? "Good Performance"
                      : "Room for Improvement"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-light-800/30" />

      {/* Final Assessment */}
      <div className="card-border">
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-200/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            Final Assessment
          </h3>
          <p className="text-light-100/80 leading-relaxed">
            {feedback?.finalAssessment}
          </p>
        </div>
      </div>

      {/* Interview Breakdown */}
      <div className="card-border">
        <div className="card p-8 space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-200/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            Performance Breakdown
          </h2>

          <div className="space-y-4">
            {feedback?.categoryScores?.map((category, index) => (
              <div
                key={index}
                className="p-5 bg-dark-300/50 rounded-xl border border-light-800/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-200/10 flex items-center justify-center text-sm text-primary-200">
                      {index + 1}
                    </span>
                    {category.name}
                  </p>
                  <span
                    className={`text-lg font-bold ${getScoreColor(category.score)}`}
                  >
                    {category.score}/100
                  </span>
                </div>
                <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      category.score >= 80
                        ? "bg-green-500"
                        : category.score >= 60
                          ? "bg-yellow-500"
                          : "bg-orange-500"
                    }`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <p className="text-light-100/70 text-sm leading-relaxed">
                  {category.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="card-border">
        <div className="card p-8 space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-green-400">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Strengths
          </h3>
          <ul className="space-y-3">
            {feedback?.strengths?.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 bg-green-400/5 rounded-lg border border-green-400/20"
              >
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-light-100/80">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Areas for Improvement */}
      <div className="card-border">
        <div className="card p-8 space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-orange-400">
            <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {feedback?.areasForImprovement?.map((area, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 bg-orange-400/5 rounded-lg border border-orange-400/20"
              >
                <svg
                  className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-light-100/80">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <Button className="btn-secondary flex-1 group">
          <Link
            href="/"
            className="flex w-full justify-center items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <p className="text-sm font-semibold text-center">
              Back to Dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1 group">
          <Link
            href={`/Interview/${id}`}
            className="flex w-full justify-center items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <p className="text-sm font-semibold text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
