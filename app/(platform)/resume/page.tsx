export const dynamic = "force-dynamic";

import { getResume } from "@/src/actions/resume";
import ResumeBuilder from "@/src/components/resume/resume-builder";
import { onAuthenticatedUser } from "@/src/actions/auth";

export default async function ResumePage() {
  const resume = await getResume();
  const auth = await onAuthenticatedUser();

  if (!auth?.user) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content || ""} user={auth.user} />
    </div>
  );
}