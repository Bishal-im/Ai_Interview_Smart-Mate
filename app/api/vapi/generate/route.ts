import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { success } from "zod";

export async function GET()
{
    return Response.json({success:true ,data: 'Thank You!'} , {status: 200});
    
}

export async function POST(request: Request ){
    const { type , role , level ,techstack , amount , userid} = await request.json();

    try{// now if all goes right ( generate ai text that vapi ai agent will use)

        const {text: questions} = await generateText({
         model: google('gemini-2.0-flash-001'),
         prompt: `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]
        
            Thank you!`, });  
    
        
        // const to store into db and pass to vapi
        const interview = {
            role, level ,type,
            techstack: techstack.split(','),
            questions : JSON.parse(questions),   // stores ques
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt:new Date().toISOString()
        }


        // store in db
        await db.collection("interviews").add(interview);

        return Response.json({sucess:true},{status:200});


    } catch(error){
        console.error(error);

        return Response.json({success:false ,error} ,{ status: 500});
    }

}



// import { db } from "@/firebase/admin";
// import { getRandomInterviewCover } from "@/lib/utils";
// import { google } from "@ai-sdk/google";
// import { generateText } from "ai";

// export async function GET() {
//     console.log("✅ GET /api/vapi/generate - Health check");
//     return Response.json({success: true, data: 'Thank You!'}, {status: 200});
// }

// export async function POST(request: Request) {
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🟢 POST /api/vapi/generate CALLED!");
//     console.log("🕐 Timestamp:", new Date().toISOString());
    
//     let body;
//     try {
//         body = await request.json();
//         console.log("📦 Raw body received:", JSON.stringify(body, null, 2));
//     } catch (e) {
//         console.error("❌ Failed to parse JSON body:", e);
//         return Response.json({success: false, error: "Invalid JSON"}, {status: 400});
//     }
    
//     const { type, role, level, techstack, amount, userid } = body;
    
//     console.log("📋 Extracted values:");
//     console.log("  - type:", type);
//     console.log("  - role:", role);
//     console.log("  - level:", level);
//     console.log("  - techstack:", techstack);
//     console.log("  - amount:", amount);
//     console.log("  - userid:", userid);
    
//     // Validate required fields
//     if (!role || !level || !techstack || !amount || !userid) {
//         console.error("❌ MISSING REQUIRED FIELDS!");
//         console.error("  - role:", !!role);
//         console.error("  - level:", !!level);
//         console.error("  - techstack:", !!techstack);
//         console.error("  - amount:", !!amount);
//         console.error("  - userid:", !!userid);
//         return Response.json({
//             success: false, 
//             error: "Missing required fields",
//             received: { role, level, techstack, amount, userid }
//         }, {status: 400});
//     }

//     try {
//         console.log("🤖 Calling Gemini API to generate questions...");
        
//         const { text: questions } = await generateText({
//             model: google('gemini-2.0-flash-001'),
//             prompt: `Prepare questions for a job interview.
//                 The job role is ${role}.
//                 The job experience level is ${level}.
//                 The tech stack used in the job is: ${techstack}.
//                 The focus between behavioural and technical questions should lean towards: ${type || 'Mixed'}.
//                 The amount of questions required is: ${amount}.
//                 Please return only the questions, without any additional text.
//                 The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//                 Return the questions formatted like this:
//                 ["Question 1", "Question 2", "Question 3"]
            
//                 Thank you!`,
//         });
        
//         console.log("✅ Gemini response received!");
//         console.log("📝 Questions (first 200 chars):", questions.substring(0, 200));
        
//         let parsedQuestions;
//         try {
//             parsedQuestions = JSON.parse(questions);
//             console.log("✅ Questions parsed successfully. Count:", parsedQuestions.length);
//         } catch (parseError) {
//             console.error("❌ Failed to parse questions JSON:", parseError);
//             console.error("Raw questions:", questions);
//             throw new Error("Failed to parse Gemini response as JSON");
//         }
        
//         const interview = {
//             role, 
//             level, 
//             type: type || 'Mixed',
//             techstack: techstack.split(',').map((t: string) => t.trim()),
//             questions: parsedQuestions,
//             userId: userid,
//             finalized: true,
//             coverImage: getRandomInterviewCover(),
//             createdAt: new Date().toISOString()
//         };
        
//         console.log("📦 Interview object prepared:");
//         console.log(JSON.stringify(interview, null, 2));
        
//         console.log("💾 Saving to Firestore...");
//         const docRef = await db.collection("interviews").add(interview);
//         console.log("✅✅✅ INTERVIEW SAVED SUCCESSFULLY! ✅✅✅");
//         console.log("🆔 Interview ID:", docRef.id);
//         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

//         return Response.json({
//             success: true, 
//             interviewId: docRef.id,
//             message: "Interview created successfully"
//         }, {status: 200});

//     } catch(error: any) {
//         console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//         console.error("❌❌❌ ERROR IN POST /api/vapi/generate ❌❌❌");
//         console.error("Error type:", error?.constructor?.name);
//         console.error("Error message:", error?.message);
//         console.error("Full error:", error);
//         console.error("Stack trace:", error?.stack);
//         console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
//         return Response.json({
//             success: false, 
//             error: error?.message || String(error)
//         }, {status: 500});
//     }
// }