"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Loader2,
    Monitor,
    Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import { saveResume } from "@/src/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/src/hooks/use-fetch";
import { entriesToMarkdown, EntryProps } from "@/src/lib/helper";
import { resumeSchema } from "@/src/lib/schema";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import { z } from "zod";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

type ResumeFormData = z.infer<typeof resumeSchema>;

interface User {
  id: string;
  name: string | null;
  email: string;
}

export default function ResumeBuilder({ initialContent, user }: { initialContent: string, user: User }) {
    const [activeTab, setActiveTab] = useState("edit");
    const [previewContent, setPreviewContent] = useState(initialContent);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<ResumeFormData>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {
                email: "",
                mobile: "",
                linkedin: "",
                twitter: "",
            },
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        },
    });

    const {
        loading: saving,
        fn: saveResumeFn,
    } = useFetch(saveResume);

    const getFormData = useCallback(() => {
        const formData = watch();
        return {
            experience: (formData.experience || []).map(entry => ({
                title: entry.title,
                organization: entry.organization,
                startDate: entry.startDate,
                endDate: entry.endDate,
                description: entry.description,
                current: entry.current,
            })) as EntryProps[],
            education: (formData.education || []).map(entry => ({
                title: entry.title,
                organization: entry.organization,
                startDate: entry.startDate,
                endDate: entry.endDate,
                description: entry.description,
                current: entry.current,
            })) as EntryProps[],
            projects: (formData.projects || []).map(entry => ({
                title: entry.title,
                organization: entry.organization,
                startDate: entry.startDate,
                endDate: entry.endDate,
                description: entry.description,
                current: entry.current,
            })) as EntryProps[],
            contactInfo: formData.contactInfo,
            summary: formData.summary || "",
            skills: formData.skills || "",
        };
    }, [watch]);

    const getMarkdownContent = useCallback((entries: EntryProps[], type: string) => {
        return entriesToMarkdown(entries, type);
    }, []);

    const getCombinedContent = useCallback(() => {
        const { experience, education, projects, contactInfo, summary, skills } = getFormData();
        const sections = [
            `## ${user.name}\n\n`,
            `### Contact Information\n\n`,
            `- Email: ${contactInfo.email}`,
            contactInfo.mobile ? `- Phone: ${contactInfo.mobile}` : "",
            contactInfo.linkedin ? `- LinkedIn: ${contactInfo.linkedin}` : "",
            contactInfo.twitter ? `- Twitter: ${contactInfo.twitter}` : "",
            "\n",
            summary ? `### Professional Summary\n\n${summary}\n\n` : "",
            skills ? `### Skills\n\n${skills}\n\n` : "",
            getMarkdownContent(experience, "Work Experience"),
            getMarkdownContent(education, "Education"),
            getMarkdownContent(projects, "Projects"),
        ].filter(Boolean);

        return sections.join("\n");
    }, [getMarkdownContent, getFormData, user.name]);

    const watchedFields = useMemo(() => ({
        experience: watch("experience"),
        education: watch("education"),
        projects: watch("projects"),
        contactInfo: watch("contactInfo"),
        summary: watch("summary"),
        skills: watch("skills"),
    }), [watch]);

    useEffect(() => {
        const content = getCombinedContent();
        setPreviewContent(content);
    }, [getCombinedContent, watchedFields]);

    const onSubmit = async () => {
        try {
            const content = getCombinedContent();
            await saveResumeFn(content);
            toast.success("Resume saved successfully!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to save resume");
            } else {
                toast.error("Failed to save resume");
            }
        }
    };

    const generatePDF = async () => {
        const element = document.getElementById("resume-preview");
        if (!element) return;

        try {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("resume.pdf");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to generate PDF");
            } else {
                toast.error("Failed to generate PDF");
            }
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold gradient-title">Resume Builder</h1>
                <div className="flex gap-2">
                    <Button onClick={generatePDF} variant="outline">
                        <Monitor className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} disabled={saving}>
                        {saving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Save
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input {...register("contactInfo.email")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input {...register("contactInfo.mobile")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>LinkedIn</Label>
                                        <Input {...register("contactInfo.linkedin")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Twitter</Label>
                                        <Input {...register("contactInfo.twitter")} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea {...register("summary")} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea {...register("skills")} />
                            </CardContent>
                        </Card>

                        <EntryForm
                            type="experience"
                            entries={watch("experience")}
                            onChange={(entries) => setValue("experience", entries)}
                        />

                        <EntryForm
                            type="education"
                            entries={watch("education")}
                            onChange={(entries) => setValue("education", entries)}
                        />

                        <EntryForm
                            type="projects"
                            entries={watch("projects")}
                            onChange={(entries) => setValue("projects", entries)}
                        />
                    </form>
                </TabsContent>
                <TabsContent value="preview">
                    <Card>
                        <CardContent className="p-6">
                            <div id="resume-preview" className="prose max-w-none">
                                <MDEditor.Markdown source={previewContent} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}