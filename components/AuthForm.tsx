"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

const Agent = ({
  userName,
  userId,
  interviewId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  // Event listeners
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("Generate feedback here.");

    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
    });

    if (success && id) {
      router.push(`/Interview/${interviewId}/feedback`);
    } else {
      console.log("Error saving feedback");
      router.push("/");
    }
  };

  // Redirect after call finishes
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer card with enhanced visuals */}
        <div className="card-interviewer relative overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-2 h-2 bg-primary-200 rounded-full animate-ping" />
            <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-1000" />
            <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-primary-200 rounded-full animate-ping animation-delay-2000" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="avatar relative">
              <Image
                src="/logo.svg"
                alt="AI Interviewer"
                width={75}
                height={64}
                className="object-cover relative z-10 drop-shadow-2xl"
              />
              {isSpeaking && (
                <>
                  <span className="animate-speak" />
                  <span
                    className="animate-speak animation-delay-300"
                    style={{ animationDuration: "1.5s" }}
                  />
                </>
              )}

              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 z-20">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-4 border-dark-200 flex items-center justify-center",
                    callStatus === CallStatus.ACTIVE && "bg-green-500",
                    callStatus === CallStatus.CONNECTING &&
                      "bg-yellow-500 animate-pulse",
                    callStatus === CallStatus.INACTIVE && "bg-gray-500",
                    callStatus === CallStatus.FINISHED && "bg-red-500"
                  )}
                >
                  {callStatus === CallStatus.ACTIVE && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                AI Interviewer
              </h3>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-dark-300/50 rounded-full border border-primary-200/30">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    callStatus === CallStatus.ACTIVE &&
                      "bg-green-500 animate-pulse",
                    callStatus === CallStatus.CONNECTING &&
                      "bg-yellow-500 animate-pulse",
                    callStatus === CallStatus.INACTIVE && "bg-gray-500",
                    callStatus === CallStatus.FINISHED && "bg-red-500"
                  )}
                />
                <span className="text-xs font-medium text-light-100/80">
                  {callStatus === CallStatus.ACTIVE && "Active"}
                  {callStatus === CallStatus.CONNECTING && "Connecting..."}
                  {callStatus === CallStatus.INACTIVE && "Ready"}
                  {callStatus === CallStatus.FINISHED && "Completed"}
                </span>
              </div>
            </div>

            {/* Wave visualization when speaking */}
            {isSpeaking && (
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary-200 rounded-full animate-wave"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User card with enhanced design */}
        <div className="card-border">
          <div className="card-content">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-purple-500/20 rounded-full blur-2xl" />
              <Image
                src="/user-avatar.png"
                alt="User Avatar"
                width={130}
                height={130}
                className="relative rounded-full object-cover border-4 border-primary-200/30 shadow-2xl"
              />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">{userName}</h3>
              <div className="flex items-center gap-2 justify-center px-4 py-1.5 bg-primary-200/10 rounded-full border border-primary-200/30">
                <svg
                  className="w-4 h-4 text-primary-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-primary-200">
                  Candidate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript with enhanced styling */}
      {messages.length > 0 && (
        <div className="transcript-border relative">
          <div className="transcript relative overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex items-start gap-3 max-w-3xl mx-auto">
              <div className="w-8 h-8 rounded-lg bg-primary-200/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-5 h-5 text-primary-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <p
                key={latestMessage}
                className={cn(
                  "transition-all duration-500 opacity-0 flex-1 text-left",
                  "animate-fadeIn opacity-100"
                )}
              >
                {latestMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Call button with enhanced design */}
      <div className="w-full flex justify-center mt-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call group" onClick={handleCall}>
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            ></span>
            <span className="relative z-10 flex items-center gap-3">
              {isCallInactiveOrFinished ? (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Start Call
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connecting
                </>
              )}
            </span>
          </button>
        ) : (
          <button
            className="btn-disconnect group relative overflow-hidden"
            onClick={handleDisconnect}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              END CALL
            </span>
            {/* Animated background pulse */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 animate-pulse opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
