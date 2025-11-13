"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = "btn-secondary" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={className}
      aria-label="Go back"
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButton;
