"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className=" shadow-lg rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in bg-gradient-to-r from-violet-600/40 to-orange-400/40">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-violet-600 bg-clip-text text-transparent mb-6 animate-slide-down">
                    Sign In
                </h1>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-md mb-4 shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 animate-fade-in gap-x-3"
                >
                    <span>Sign in using Google</span>
                </button>

                <button
                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 animate-fade-in gap-x-4"
                >
                    <span>Sign in using GitHub</span>
                </button>
            </div>
        </div>
    );
}