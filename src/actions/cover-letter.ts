"use server";

import { client } from "@/src/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { onAuthenticatedUser } from "./auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface CoverLetterData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

export async function generateCoverLetter(data: CoverLetterData) {
  const auth = await onAuthenticatedUser();
  if (!auth.user) throw new Error("Unauthorized");

  const user = await client.user.findUnique({
    where: { authUserId: auth.user.email },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await client.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error: unknown) {
    console.error("Error generating cover letter:", error instanceof Error ? error.message : String(error));
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetters() {
  const auth = await onAuthenticatedUser();
  if (!auth.user) throw new Error("Unauthorized");

  const user = await client.user.findUnique({
    where: { authUserId: auth.user.email },
  });

  if (!user) throw new Error("User not found");

  return await client.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id: string) {
  const auth = await onAuthenticatedUser();
  if (!auth.user) throw new Error("Unauthorized");

  const user = await client.user.findUnique({
    where: { authUserId: auth.user.email },
  });

  if (!user) throw new Error("User not found");

  return await client.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id: string) {
  const auth = await onAuthenticatedUser();
  if (!auth.user) throw new Error("Unauthorized");

  const user = await client.user.findUnique({
    where: { authUserId: auth.user.email },
  });

  if (!user) throw new Error("User not found");

  return await client.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}