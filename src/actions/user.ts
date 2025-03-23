"use server";

import { revalidatePath } from "next/cache";

import { client } from "@/src/lib/prisma";
import { onAuthenticatedUser } from "./auth";
import { generateAIInsights } from "./dashboard";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function updateUser(data: User) {
    const auth = await onAuthenticatedUser();
    if (!auth.user) redirect("/sign-in")

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
    });

    if (!user) throw new Error("User not found");

    try {
        // Start a transaction to handle both operations
        const result = await client.$transaction(
            async (tx) => {
                // First check if industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry!,
                    },
                });

                // If industry doesn't exist, create it with default values
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry!);

                    industryInsight = await client.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                }

                // Now update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return { updatedUser, industryInsight };
            },
            {
                timeout: 10000, // default: 5000
            }
        );

        revalidatePath("/");
        return result.updatedUser;
    } catch (error: any) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getUserOnboardingStatus() {
    const auth = await onAuthenticatedUser();
    if (!auth.user){
        redirect("/sign-in")
    } 

    const user = await client.user.findUnique({
        where: { authUserId: auth.user.email },
    });

    if (!user) throw new Error("User not found");

    try {
        const user = await client.user.findUnique({
            where: {
                authUserId: auth.user.email,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}