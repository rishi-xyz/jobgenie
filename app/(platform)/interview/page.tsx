import { getAssessments } from "@/src/actions/interview";
import StatsCards from "@/src/components/interview/stats-card";
import PerformanceChart from "@/src/components/interview/performance-card";
import QuizList from "@/src/components/interview/quiz-list";

export const dynamic = 'force-dynamic';

export default async function InterviewPrepPage() {
    const assessments = await getAssessments();

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
                    Interview Preparation
                </h1>
            </div>
            <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
            </div>
        </div>
    );
}