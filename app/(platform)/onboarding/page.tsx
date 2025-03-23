import { redirect } from "next/navigation";
import { industries } from "@/src/data/industries";
import OnboardingForm from "@/src/components/onboarding/onboarding-form";
import { getUserOnboardingStatus } from "@/src/actions/user";

export const dynamic = 'force-dynamic';

export default async function OnboardingPage() {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}