"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface InterviewSetupFormProps {
  userId: string;
}

const InterviewSetupForm = ({ userId }: InterviewSetupFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    level: "Entry-level",
    techstack: "",
    type: "Mixed",
    amount: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userid: userId,
        }),
      });

      const data = await response.json();

      if (data.success || data.sucess) {
        // Note: API has typo "sucess"
        alert("✅ Interview created successfully!");
        router.push("/");
        router.refresh();
      } else {
        alert("❌ Failed to create interview. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="card-border">
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Role */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-100">
              Job Role <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer, Data Scientist, Backend Engineer"
              className="w-full px-4 py-3 bg-dark-300 border border-light-800/30 rounded-lg focus:outline-none focus:border-primary-200 text-light-100"
              required
            />
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-100">
              Experience Level <span className="text-red-400">*</span>
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-300 border border-light-800/30 rounded-lg focus:outline-none focus:border-primary-200 text-light-100"
              required
            >
              <option value="Entry-level">Entry-level (0-2 years)</option>
              <option value="Mid-level">Mid-level (3-5 years)</option>
              <option value="Senior-level">Senior-level (5+ years)</option>
            </select>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-100">
              Tech Stack <span className="text-red-400">*</span>
            </label>
            <textarea
              name="techstack"
              value={formData.techstack}
              onChange={handleChange}
              placeholder="e.g., React, TypeScript, Node.js, MongoDB, AWS"
              rows={3}
              className="w-full px-4 py-3 bg-dark-300 border border-light-800/30 rounded-lg focus:outline-none focus:border-primary-200 resize-none text-light-100"
              required
            />
            <p className="text-xs text-light-100/60">
              💡 Separate multiple technologies with commas
            </p>
          </div>

          {/* Interview Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-100">
              Interview Focus <span className="text-red-400">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-300 border border-light-800/30 rounded-lg focus:outline-none focus:border-primary-200 text-light-100"
              required
            >
              <option value="Technical">
                Technical (Coding & Problem Solving)
              </option>
              <option value="Behavioral">
                Behavioral (Soft Skills & Experience)
              </option>
              <option value="Mixed">Mixed (Both Technical & Behavioral)</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-100">
              Number of Questions <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="3"
                max="15"
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary-200 min-w-[3rem] text-center">
                {formData.amount}
              </span>
            </div>
            <p className="text-xs text-light-100/60">
              📊 Choose between 3-15 questions (recommended: 5-10)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-6 text-base font-semibold"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Interview Questions...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Interview
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InterviewSetupForm;
