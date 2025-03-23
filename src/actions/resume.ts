"use server";

import { client } from "@/src/lib/prisma";
import { onAuthenticatedUser } from "./auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function saveResume(content: string) {
    const auth = await onAuthenticatedUser();
    if (!auth.user) throw new Error("Unauthorized");

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
    });

    if (!user) throw new Error("User not found");

    try {
        const resume = await client.resume.upsert({
            where: {
                userId: user.id,
            },
            update: {
                content,
            },
            create: {
                userId: user.id,
                content,
            },
        });

        revalidatePath("/resume");
        return resume;
    } catch (error) {
        console.error("Error saving resume:", error);
        throw new Error("Failed to save resume");
    }
}

export async function getResume() {
    const auth = await onAuthenticatedUser();
    if (!auth.user) throw new Error("Unauthorized");

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
    });

    if (!user) throw new Error("User not found");

    return await client.resume.findUnique({
        where: {
            userId: user.id,
        },
    });
}

export async function improveWithAI({
    current,
    type
}: {
    current: string,
    type: string
}) {
    const auth = await onAuthenticatedUser();
    if (!auth.user) throw new Error("Unauthorized");

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
        include: {
            industryInsight: true,
        },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const improvedContent = response.text().trim();
        return improvedContent;
    } catch (error) {
        console.error("Error improving content:", error);
        throw new Error("Failed to improve content");
    }
}