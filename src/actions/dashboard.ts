"use server";

import { client } from "@/src/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { onAuthenticatedUser } from "./auth";
import { redirect } from "next/navigation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateAIInsights = async (industry: string) => {

    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

    const result = await model.generateContent(prompt);
    console.log("Result", result);
    const response = result.response;
    console.log("Response", response);
    const text = response.text();
    console.log("Response text", text);
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    console.log("Cleaned text", cleanedText);

    return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
    const auth = await onAuthenticatedUser();
    if (!auth.user) redirect("/sign-in")

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
        include: {
            industryInsight: true,
        },
    });
    console.log("user:", user)
    if (!user) throw new Error("User not found");

    // If no insights exist, generate them
    if (!user.industryInsight?.salaryRanges || !user.industryInsight.topSkills || !user.industryInsight.growthRate || !user.industryInsight.demandLevel || !user.industryInsight.keyTrends || !user.industryInsight.industry || !user.industryInsight.marketOutlook || !user.industryInsight.recommendedSkills) {
        const insights = await generateAIInsights(user.industry!);
        console.log("Generated Insights", insights)

        const industryInsight = await client.industryInsight.upsert({
            where: { industry: user.industry! },
            update: {
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            create: {
                industry: user.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return industryInsight;

    }

    return user.industryInsight;
}