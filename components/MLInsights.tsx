import React from "react";

interface MLInsightsProps {
  geminiScore: number;
  mlScore: number;
  agreementLevel: string;
  difference: number;
  confidence: string;
}

export default function MLInsights({
  geminiScore,
  mlScore,
  agreementLevel,
  difference,
  confidence,
}: MLInsightsProps) {
  const getAgreementColor = () => {
    if (agreementLevel === "Strong Agreement")
      return "border-green-200 bg-green-50";
    if (agreementLevel === "Good Agreement")
      return "border-blue-200 bg-blue-50";
    if (agreementLevel === "Moderate Agreement")
      return "border-yellow-200 bg-yellow-50";
    if (agreementLevel === "Divergent Scores")
      return "border-red-200 bg-red-50";
    return "border-gray-200 bg-gray-50";
  };

  const getIconColor = () => {
    if (agreementLevel === "Strong Agreement") return "text-green-600";
    if (agreementLevel === "Good Agreement") return "text-blue-600";
    if (agreementLevel === "Moderate Agreement") return "text-yellow-600";
    if (agreementLevel === "Divergent Scores") return "text-red-600";
    return "text-gray-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getIcon = () => {
    const iconClass = `h-5 w-5 ${getIconColor()}`;

    if (
      agreementLevel === "Strong Agreement" ||
      agreementLevel === "Good Agreement"
    ) {
      return (
        <svg
          className={iconClass}
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
      );
    }

    if (agreementLevel === "Moderate Agreement") {
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    }

    if (agreementLevel === "Divergent Scores") {
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        className={iconClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  return (
    <div className="w-full mt-6 border-2 border-purple-200 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <div className="flex items-center gap-3">
          <svg
            className="h-6 w-6 text-purple-600"
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
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dual AI Validation System
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Independent assessment by Gemini AI and Custom ML Model
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border-2 border-purple-200 bg-purple-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Gemini AI Score
              </span>
              <span
                className={`text-lg font-bold px-3 py-1 rounded-md border ${getScoreBadgeColor(geminiScore)}`}
              >
                {geminiScore}/100
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Qualitative analysis & context understanding
            </p>
          </div>

          <div className="p-4 rounded-lg border-2 border-pink-200 bg-pink-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                ML Model Score
              </span>
              <span
                className={`text-lg font-bold px-3 py-1 rounded-md border ${getScoreBadgeColor(mlScore)}`}
              >
                {mlScore > 0 ? `${mlScore.toFixed(1)}/100` : "N/A"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Quantitative features & pattern recognition
            </p>
          </div>
        </div>

        <div className={`border-2 rounded-lg p-4 ${getAgreementColor()}`}>
          <div className="flex items-start gap-3">
            {getIcon()}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-semibold text-base text-gray-800">
                  {agreementLevel}
                </span>
                {mlScore > 0 && (
                  <span className="text-sm px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                    Δ {difference.toFixed(1)} points
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">
                <strong>Confidence Level:</strong> {confidence}
              </p>
            </div>
          </div>
        </div>

        {mlScore > 0 && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Gemini AI Assessment</span>
                <span>{geminiScore}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${geminiScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>ML Model Assessment</span>
                <span>{mlScore.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-500"
                  style={{ width: `${mlScore}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
