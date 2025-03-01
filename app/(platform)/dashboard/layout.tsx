import { BarLoader } from "react-spinners";
import React, { Suspense } from "react";

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="px-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
            </div>
            <Suspense
                fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
            >
                {children}
            </Suspense>
        </div>
    );
}