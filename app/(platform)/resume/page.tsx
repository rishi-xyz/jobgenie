import { getResume } from "@/src/actions/resume";
import ResumeBuilder from "@/src/components/resume/resume-builder";


export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content!} />
    </div>
  );
}