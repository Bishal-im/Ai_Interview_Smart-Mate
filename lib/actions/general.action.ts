"use server"; 
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";
import { success } from "zod";


export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}



export async function getLatestInterview(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewByUserId( userId: string): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}








// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript } = params;

//   try {
//     console.log("🟢 Reached createFeedback"); // ✅ Step 1: confirm the function actually runs

//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");

//     console.log(
//       "🟢 Formatted transcript (first 200 chars):",
//       formattedTranscript.slice(0, 200)
//     ); // ✅ Step 2: confirm transcript data is correct

//     const {
//       object: {
//         totalScore,
//         categoryScores,
//         strengths,
//         areasForImprovement,
//         finalAssessment,
//       },
//     } = await generateObject({
//       // @ts-expect-error
//       model: google("gemini-2.0-flash-001",{
//         structuredOutputs: false
//       }),

//       schema: feedbackSchema,
//       prompt: `
//         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
//       Transcript:
//         ${formattedTranscript}

//         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//         - **Communication Skills**: Clarity, articulation, structured responses.
//         - **Technical Knowledge**: Understanding of key concepts for the role.
//         - **Problem-Solving**: Ability to analyze problems and propose solutions.
//         - **Cultural & Role Fit**: Alignment with company values and job role.
//         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//         `,
//       system:
//         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//     });

//     console.log("✅ Gemini response received:", {
//       totalScore,
//       categoryScores,
//     }); // ✅ Step 3: confirm Gemini returned valid object

//     const feedback = await db.collection("feedback").add({
//       interviewId,
//       userId,
//       totalScore,
//       categoryScores,
//       strengths,
//       areasForImprovement,
//       finalAssessment,
//       createdAt: new Date().toISOString(),
//     });

//     console.log("✅ Firestore write success. Doc ID:", feedback.id); // ✅ Step 4: confirm Firestore success

//     return {
//       success: true,
//       feedbackId: feedback.id,
//     };
//   } catch (e) {
//     console.error("❌ Error saving Feedback", e);
//     console.error("🔥 Full error object:", JSON.stringify(e, null, 2));
//     return { success: false };
//   }
// }


export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object: {totalScore ,categoryScores,strengths,areasForImprovement,finalAssessment} } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
      Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection('feedback').add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString()
    })

    return {
      success: true,
      feedbackId: feedback.id
    }

  }catch(e){
    console.error('Error saving Feedback', e)
    console.error("🔥 Full error object:", JSON.stringify(e, null, 2));
    return{success:false}
  }
  
}



export async function getFeedbackByInterviewId(params:GetFeedbackByInterviewIdParams) :Promise <Feedback | null > {
  const {interviewId , userId} = params;

  const feedbackQuery = await db.collection('feedback')
   .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();
  
     if (feedbackQuery.empty) return null;

     const feedbackDoc = feedbackQuery.docs[0];
     
   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}






