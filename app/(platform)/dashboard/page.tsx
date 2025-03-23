import { redirect } from "next/navigation";

import DashboardView from "@/src/components/dashboard/dashboard-view";
import { getIndustryInsights } from "@/src/actions/dashboard";
import { getUserOnboardingStatus } from "@/src/actions/user";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const { isOnboarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    // Skip this check if already on the onboarding page
    if (!isOnboarded) {
        redirect("/onboarding");
    }

    const insights = await getIndustryInsights();

    return (
        <div className="container mx-auto">
            <DashboardView insights={insights} />
        </div>
    );
}