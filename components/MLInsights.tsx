// import React from "react";

// interface MLInsightsProps {
//   geminiScore: number;
//   mlScore: number;
//   agreementLevel: string;
//   difference: number;
//   confidence: string;
// }

// export default function MLInsights({
//   geminiScore,
//   mlScore,
//   agreementLevel,
//   difference,
//   confidence,
// }: MLInsightsProps) {
//   const isMLAvailable = mlScore > 0;

//   const getAgreementColor = () => {
//     if (!isMLAvailable) return "border-light-800/30 bg-dark-300/50";
//     if (agreementLevel === "Strong Agreement")
//       return "border-green-400/30 bg-green-400/5";
//     if (agreementLevel === "Good Agreement")
//       return "border-primary-200/30 bg-primary-200/5";
//     if (agreementLevel === "Moderate Agreement")
//       return "border-yellow-400/30 bg-yellow-400/5";
//     if (agreementLevel === "Divergent Scores")
//       return "border-orange-400/30 bg-orange-400/5";
//     return "border-light-800/30 bg-dark-300/50";
//   };

//   const getIconColor = () => {
//     if (!isMLAvailable) return "text-light-100/60";
//     if (agreementLevel === "Strong Agreement") return "text-green-400";
//     if (agreementLevel === "Good Agreement") return "text-primary-200";
//     if (agreementLevel === "Moderate Agreement") return "text-yellow-400";
//     if (agreementLevel === "Divergent Scores") return "text-orange-400";
//     return "text-light-100/60";
//   };

//   const getScoreBadgeColor = (score: number) => {
//     if (score >= 80)
//       return "bg-green-400/10 text-green-400 border-green-400/30";
//     if (score >= 60)
//       return "bg-primary-200/10 text-primary-200 border-primary-200/30";
//     if (score >= 40)
//       return "bg-yellow-400/10 text-yellow-400 border-yellow-400/30";
//     return "bg-orange-400/10 text-orange-400 border-orange-400/30";
//   };

//   const getIcon = () => {
//     const iconClass = `h-5 w-5 ${getIconColor()}`;

//     if (!isMLAvailable) {
//       return (
//         <svg
//           className={iconClass}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       );
//     }

//     if (
//       agreementLevel === "Strong Agreement" ||
//       agreementLevel === "Good Agreement"
//     ) {
//       return (
//         <svg
//           className={iconClass}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       );
//     }

//     if (agreementLevel === "Moderate Agreement") {
//       return (
//         <svg
//           className={iconClass}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//           />
//         </svg>
//       );
//     }

//     return (
//       <svg
//         className={iconClass}
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     );
//   };

//   return (
//     <div className="w-full card-border">
//       <div className="card p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-start gap-4">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
//             <svg
//               className="h-7 w-7 text-primary-200"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//               />
//             </svg>
//           </div>
//           <div className="flex-1">
//             <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
//               Dual AI Validation System
//             </h3>
//             <p className="text-sm text-light-100/60">
//               Independent assessment combining qualitative analysis and
//               quantitative pattern recognition
//             </p>
//           </div>
//         </div>

//         {/* Score Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Gemini Card */}
//           <div className="relative overflow-hidden rounded-xl border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-dark-300/50 p-5 backdrop-blur-sm">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
//             <div className="relative space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5 text-purple-400"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-sm font-semibold text-light-100/90">
//                     Gemini AI
//                   </span>
//                 </div>
//                 <span
//                   className={`text-2xl font-bold px-4 py-1.5 rounded-lg border-2 ${getScoreBadgeColor(geminiScore)}`}
//                 >
//                   {geminiScore}
//                 </span>
//               </div>
//               <div className="h-2 bg-dark-300/80 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000"
//                   style={{ width: `${geminiScore}%` }}
//                 />
//               </div>
//               <p className="text-xs text-light-100/60 leading-relaxed">
//                 Contextual understanding, communication style, cultural fit
//                 analysis
//               </p>
//             </div>
//           </div>

//           {/* ML Card */}
//           <div className="relative overflow-hidden rounded-xl border-2 border-pink-400/20 bg-gradient-to-br from-pink-500/10 to-dark-300/50 p-5 backdrop-blur-sm">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
//             <div className="relative space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5 text-pink-400"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
//                     <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
//                     <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
//                   </svg>
//                   <span className="text-sm font-semibold text-light-100/90">
//                     ML Model
//                   </span>
//                 </div>
//                 <span
//                   className={`text-2xl font-bold px-4 py-1.5 rounded-lg border-2 ${
//                     isMLAvailable
//                       ? getScoreBadgeColor(mlScore)
//                       : "bg-dark-300/50 text-light-100/40 border-light-800/30"
//                   }`}
//                 >
//                   {isMLAvailable ? mlScore.toFixed(1) : "N/A"}
//                 </span>
//               </div>
//               <div className="h-2 bg-dark-300/80 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full transition-all duration-1000 ${
//                     isMLAvailable
//                       ? "bg-gradient-to-r from-pink-500 to-pink-600"
//                       : "bg-light-800/30"
//                   }`}
//                   style={{ width: isMLAvailable ? `${mlScore}%` : "0%" }}
//                 />
//               </div>
//               <p className="text-xs text-light-100/60 leading-relaxed">
//                 {isMLAvailable
//                   ? "Quantitative features, technical keywords, response patterns"
//                   : "ML validation temporarily unavailable - using Gemini assessment only"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Agreement Analysis */}
//         <div
//           className={`border-2 rounded-xl p-5 transition-all duration-300 ${getAgreementColor()}`}
//         >
//           <div className="flex items-start gap-3">
//             {getIcon()}
//             <div className="flex-1 space-y-3">
//               <div className="flex items-center justify-between flex-wrap gap-2">
//                 <div>
//                   <span className="font-bold text-base text-light-100 block mb-1">
//                     {isMLAvailable ? agreementLevel : "Single Validation Mode"}
//                   </span>
//                   <span className="text-sm text-light-100/70">
//                     {isMLAvailable
//                       ? confidence
//                       : "Assessment based on Gemini AI analysis only"}
//                   </span>
//                 </div>
//                 {isMLAvailable && (
//                   <span className="text-sm px-3 py-1.5 rounded-lg bg-dark-300/80 text-light-100 font-semibold border border-light-800/30">
//                     Δ {difference.toFixed(1)} points
//                   </span>
//                 )}
//               </div>

//               {isMLAvailable ? (
//                 <div className="grid grid-cols-2 gap-3 text-xs">
//                   <div className="flex items-center gap-2 text-light-100/70">
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span>Independent validation</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-light-100/70">
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span>Cross-referenced scoring</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-start gap-2 p-3 bg-primary-200/5 rounded-lg border border-primary-200/20">
//                   <svg
//                     className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <div className="text-xs text-light-100/80 leading-relaxed">
//                     <strong className="text-primary-200">Note:</strong> ML
//                     validation is currently unavailable. Your feedback is based
//                     solely on Gemini AI's comprehensive analysis, which includes
//                     contextual understanding, communication assessment, and
//                     cultural fit evaluation.
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Info Footer */}
//         <div className="flex items-start gap-2 p-4 bg-primary-200/5 rounded-lg border border-primary-200/20">
//           <svg
//             className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <p className="text-xs text-light-100/70 leading-relaxed">
//             <strong className="text-primary-200">How it works:</strong> Our dual
//             validation system combines AI-powered contextual analysis with
//             machine learning pattern recognition to provide comprehensive
//             interview feedback. When both systems are available, their agreement
//             level indicates the reliability of your assessment.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

interface MLInsightsProps {
  geminiScore: number;
  mlScore: number;
  agreementLevel: string;
  difference: number;
  confidence: string;
}

const MLInsights: React.FC<MLInsightsProps> = ({
  geminiScore,
  mlScore,
  agreementLevel,
  difference,
  confidence,
}) => {
  // Don't show if ML score is 0 (ML API unavailable)
  if (mlScore === 0) {
    return (
      <div className="card-border">
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-400">
            <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            ML Insights
          </h3>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ ML Model validation is currently unavailable. Only Gemini AI
              scoring is active.
            </p>
            <p className="text-light-100/60 text-xs mt-2">
              This doesn't affect the main feedback quality. The ML model API
              may be offline or not configured.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get agreement badge color
  const getAgreementColor = (level: string) => {
    switch (level) {
      case "Strong Agreement":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "Good Agreement":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "Moderate Agreement":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "Divergent Scores":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  // Calculate average score
  const averageScore = Math.round((geminiScore + mlScore) / 2);

  return (
    <div className="card-border">
      <div className="card p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-400">
          <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          ML Validation Insights
        </h3>

        {/* Score Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Gemini Score */}
          <div className="bg-dark-300/50 p-5 rounded-xl border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold">Gemini AI Score</h4>
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {geminiScore}
            </div>
            <p className="text-light-100/60 text-sm mt-1">
              Holistic AI Assessment
            </p>
          </div>

          {/* ML Score */}
          <div className="bg-dark-300/50 p-5 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold">ML Model Score</h4>
            </div>
            <div className="text-3xl font-bold text-purple-400">{mlScore}</div>
            <p className="text-light-100/60 text-sm mt-1">
              Feature-based Analysis
            </p>
          </div>
        </div>

        {/* Agreement Status */}
        <div className="bg-dark-300/30 p-5 rounded-xl border border-light-800/20 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-2">Score Agreement</h4>
              <div
                className={`inline-block px-4 py-2 rounded-lg border ${getAgreementColor(agreementLevel)}`}
              >
                {agreementLevel}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{difference.toFixed(1)}</div>
              <p className="text-light-100/60 text-sm">Point Difference</p>
            </div>
          </div>
          <div className="mt-4">
            <p
              className={`text-sm font-medium ${
                agreementLevel === "Strong Agreement"
                  ? "text-green-400"
                  : agreementLevel === "Good Agreement"
                    ? "text-blue-400"
                    : agreementLevel === "Moderate Agreement"
                      ? "text-yellow-400"
                      : "text-red-400"
              }`}
            >
              {confidence}
            </p>
            <p className="text-light-100/60 text-xs mt-1">
              {agreementLevel === "Strong Agreement"
                ? "Both models strongly agree on the assessment."
                : agreementLevel === "Good Agreement"
                  ? "Models generally agree with minor variations."
                  : agreementLevel === "Moderate Agreement"
                    ? "Moderate differences suggest reviewing specific aspects."
                    : "Significant divergence - human review recommended."}
            </p>
          </div>
        </div>

        {/* Combined Score */}
        <div className="bg-primary-200/5 p-5 rounded-xl border border-primary-200/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Combined Assessment Score</h4>
            <div className="text-2xl font-bold text-primary-200">
              {averageScore}/100
            </div>
          </div>
          <p className="text-light-100/60 text-sm">
            Average of Gemini AI and ML Model scores for comprehensive
            evaluation
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLInsights;
