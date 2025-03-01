"use server";

import { authOptions } from "@/src/lib/authprovider";
import { client } from "@/src/lib/prisma";
import { getServerSession } from "next-auth"

export const onAuthenticatedUser = async () => {
    try {
        //get currently logged in user info
        const userSession = await getServerSession(authOptions);
        const user = userSession?.user || null;
        //if user not logged in 
        if (!user) {
            return { status: 403 };
        }
        //compare it with database, when return the info also get the purchesed projects by their id
        const userExist = await client.user.findUnique({
            where: {
                authUserId: user.email!, //auth id is usually their email
            },
        })
        //if user exist
        if (userExist) {
            return {
                status: 200,
                user: userExist,
            }
        }
        //otherwise if user doesn't exist create new user
        const newUser = await client.user.create({
            data: {
                authUserId: user.email!,
                email: user.email!,
                name: user.name!,
                imageUrl: user.image!,
            }
        })
        // if user created then return the user info
        if (newUser) {
            return {
                status: 201,
                user: newUser
            }
        }

        return {
            status: 400
        }
    } catch (error) {
        console.log(`🔴 Error`, error);
        return {
            status: 500,
            error: "Internal Server Error"
        };
    }
}