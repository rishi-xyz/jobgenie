"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import QuizResult from "./quiz-result";
import { JsonValue } from "@prisma/client/runtime/library";

type AssessmentsProps = {
    quizScore: number;
    questions: JsonValue[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    category: string;
    improvementTip: string | null;
}[]

type Question = {
    question: string;
    userAnswer: string;
    isCorrect: boolean;
    answer: string;
    explanation: string;
};

export default function QuizList({ assessments }: { assessments: AssessmentsProps }) {
    const router = useRouter();
    const [selectedQuiz, setSelectedQuiz] = useState<AssessmentsProps[number] | null>(null);

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="gradient-title text-3xl md:text-4xl">
                                Recent Quizzes
                            </CardTitle>
                            <CardDescription>
                                Review your past quiz performance
                            </CardDescription>
                        </div>
                        <Button onClick={() => router.push("/interview/mock")}>
                            Start New Quiz
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {assessments?.map((assessment, i) => (
                            <Card
                                key={assessment.id}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => setSelectedQuiz(assessment)}
                            >
                                <CardHeader>
                                    <CardTitle className="gradient-title text-2xl">
                                        Quiz {i + 1}
                                    </CardTitle>
                                    <CardDescription className="flex justify-between w-full">
                                        <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                                        <div>
                                            {format(
                                                new Date(assessment.createdAt),
                                                "MMMM dd, yyyy HH:mm"
                                            )}
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                {assessment.improvementTip && (
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {assessment.improvementTip}
                                        </p>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <QuizResult
                        result={
                            selectedQuiz
                                ? {
                                    ...selectedQuiz,
                                    questions: (selectedQuiz.questions as Question[]).filter(q => q !== null)
                                }
                                : null
                        }
                        hideStartNew
                        onStartNew={() => router.push("/interview/mock")}
                    />

                </DialogContent>
            </Dialog>
        </>
    );
}