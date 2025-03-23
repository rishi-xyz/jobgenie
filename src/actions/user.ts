"use server";

import { revalidatePath } from "next/cache";

import { client } from "@/src/lib/prisma";
import { onAuthenticatedUser } from "./auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

type UpdateUserData = Partial<Pick<User, 'industry' | 'experience' | 'bio' | 'skills'>>;

export async function updateUser(data: UpdateUserData) {
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
                const industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry!,
                    },
                });

                if (!industryInsight) {
                    await tx.industryInsight.create({
                        data: {
                            industry: data.industry!,
                            growthRate: 0,
                            demandLevel: "0",
                            marketOutlook: "0",
                            nextUpdate: new Date(),
                        },
                    });
                }
                // Update the user with the new data
                const updatedUser = await tx.user.update({
                    where: { id: user.id },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return { updatedUser };
            },
            {
                timeout: 10000, // default: 5000
            }
        );

        revalidatePath("/");
        return result.updatedUser;
    } catch (error: unknown) {
        console.error("Error updating user and industry:", error instanceof Error ? error.message : String(error));
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