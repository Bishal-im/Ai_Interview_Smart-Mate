"use client";

import React from "react";
import Link from "next/link";

const DashboardClient = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #0a0a0f 30%, #050510 70%, #000000 100%)",
      }}
    >
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/10 rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-200/8 rounded-full blur-[130px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-16 py-6 max-w-7xl mx-auto max-sm:px-4 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="url(#gradient)" />
            <path
              d="M20 10v20M10 20h20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <h2 className="text-primary-100 text-2xl font-bold max-sm:text-xl">
            SmartMate
          </h2>
        </Link>

        <div className="flex gap-4">
          <Link href="/sign-in" className="btn-secondary max-sm:hidden">
            Sign In
          </Link>
          <Link href="/sign-up" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-16 py-16 max-sm:px-4 max-sm:py-8 relative z-10">
        <div
          className="relative rounded-3xl px-16 py-10 max-sm:px-6 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(10, 10, 15, 0.95) 100%)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 0 80px rgba(6, 182, 212, 0.15), 0 25px 60px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/8 rounded-full blur-[140px] animate-pulse" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-200/10 border border-primary-200/30 rounded-full w-fit backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-200"></span>
                </span>
                <span className="text-sm font-medium text-primary-200">
                  AI-Powered Interview Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight max-sm:text-4xl">
                <span
                  className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(167, 139, 250, 0.5))",
                  }}
                >
                  Master Your Interview Skills
                </span>
                <br />
                <span
                  className="text-white"
                  style={{
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  With AI-Powered Practice
                </span>
              </h1>

              <p
                className="text-xl leading-relaxed text-white"
                style={{
                  opacity: 0.9,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Experience realistic interview simulations powered by advanced
                AI. Get real-time feedback, improve your responses, and land
                your dream job.
              </p>

              <div className="flex gap-4 max-sm:flex-col">
                <Link href="/sign-up" className="btn-primary group/btn">
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <svg
                      className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
                <button className="btn-secondary">
                  <span className="flex items-center gap-2">
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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Watch Demo
                  </span>
                </button>
              </div>

              <div className="flex gap-8 pt-4 max-sm:gap-4 max-sm:flex-wrap">
                <div className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-primary-200"
                    style={{
                      textShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                    }}
                  >
                    10K+
                  </span>
                  <span
                    className="text-sm text-white"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    Interviews Completed
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-primary-200"
                    style={{
                      textShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                    }}
                  >
                    95%
                  </span>
                  <span
                    className="text-sm text-white"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    Success Rate
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-primary-200"
                    style={{
                      textShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                    }}
                  >
                    4.9/5
                  </span>
                  <span
                    className="text-sm text-white"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    User Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="relative max-sm:hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-purple-500/20 rounded-full blur-3xl" />
              <img
                src="/robot.png"
                alt="AI Interview Assistant"
                className="relative w-[450px] h-[450px] object-contain drop-shadow-2xl"
                style={{ animation: "float 6s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-16 py-16 max-sm:px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span
              className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 30px rgba(167, 139, 250, 0.5))",
              }}
            >
              Why Choose SmartMate?
            </span>
          </h2>
          <p
            className="text-xl text-white"
            style={{
              opacity: 0.8,
            }}
          >
            Everything you need to ace your next interview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
              title: "AI-Powered Questions",
              description:
                "Get realistic interview questions tailored to your role and experience level",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
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
              ),
              title: "Detailed Analytics",
              description:
                "Receive comprehensive feedback on your performance with actionable insights",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Real-Time Practice",
              description:
                "Practice with live AI interviewer that responds to your answers in real-time",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Multiple Categories",
              description:
                "Evaluated on communication, technical knowledge, problem-solving, and more",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: "Instant Feedback",
              description:
                "Get immediate results and recommendations after each interview session",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              ),
              title: "Progress Tracking",
              description:
                "Monitor your improvement over time with detailed performance history",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-all duration-300"
              style={{
                padding: "2px",
                borderRadius: "1rem",
                background:
                  "linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(6, 182, 212, 0.4))",
              }}
            >
              <div
                className="p-8 h-full rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20, 20, 32, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow:
                    "0 25px 60px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary-200 transition-colors"
                  style={{
                    background: "rgba(6, 182, 212, 0.15)",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-white"
                  style={{
                    textShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed text-white"
                  style={{
                    opacity: 0.75,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-16 py-16 max-sm:px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span
              className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 30px rgba(167, 139, 250, 0.5))",
              }}
            >
              How It Works
            </span>
          </h2>
          <p
            className="text-xl text-white"
            style={{
              opacity: 0.8,
            }}
          >
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Account",
              description:
                "Sign up for free and set up your profile with your target role and experience level",
            },
            {
              step: "02",
              title: "Start Interview",
              description:
                "Choose from available interviews or generate custom questions based on your needs",
            },
            {
              step: "03",
              title: "Get Feedback",
              description:
                "Review detailed analytics and improve your skills with personalized recommendations",
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div
                style={{
                  padding: "2px",
                  borderRadius: "1rem",
                  background:
                    "linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(6, 182, 212, 0.4))",
                }}
              >
                <div
                  className="p-8 text-center rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20, 20, 32, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow:
                      "0 25px 60px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-3xl font-bold text-primary-200"
                    style={{
                      background: "rgba(6, 182, 212, 0.15)",
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
                      textShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                    }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4 text-white"
                    style={{
                      textShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="leading-relaxed text-white"
                    style={{
                      opacity: 0.75,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
              {index < 2 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-200 to-purple-500"
                  style={{
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.6)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-16 py-16 max-sm:px-4 mb-16 relative z-10">
        <div
          style={{
            padding: "2px",
            borderRadius: "1rem",
            background:
              "linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(6, 182, 212, 0.4))",
          }}
        >
          <div
            className="p-16 text-center max-sm:p-8 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(20, 20, 32, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
            }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span
                className="bg-gradient-to-r from-white via-primary-200 to-purple-400 bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(167, 139, 250, 0.5))",
                }}
              >
                Ready to Ace Your Next Interview?
              </span>
            </h2>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto text-white"
              style={{
                opacity: 0.8,
              }}
            >
              Join thousands of professionals who have improved their interview
              skills with SmartMate
            </p>
            <div className="flex gap-4 justify-center max-sm:flex-col">
              <Link href="/sign-up" className="btn-primary">
                <span className="flex items-center gap-2">
                  Start Your First Interview
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 relative z-10"
        style={{
          borderTop: "1px solid rgba(100, 116, 139, 0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-16 max-sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="url(#gradient2)" />
                <path
                  d="M20 10v20M10 20h20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-primary-100 font-bold">SmartMate</span>
            </div>
            <p
              className="text-sm text-white"
              style={{
                opacity: 0.6,
              }}
            >
              © 2025 SmartMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardClient;
