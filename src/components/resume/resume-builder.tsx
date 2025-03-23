"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertTriangle,
    Download,
    Edit,
    Loader2,
    Monitor,
    Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor, { PreviewType } from "@uiw/react-md-editor";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import { saveResume } from "@/src/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/src/hooks/use-fetch";
import { entriesToMarkdown } from "@/src/lib/helper";
import { resumeSchema } from "@/src/lib/schema";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import { onAuthenticatedUser } from "@/src/actions/auth";

export default function ResumeBuilder({ initialContent, user }: { initialContent: string, user: any }) {
    const [activeTab, setActiveTab] = useState("edit");
    const [previewContent, setPreviewContent] = useState(initialContent);
    const [resumeMode, setResumeMode] = useState<PreviewType>("preview");
    const [isGenerating, setIsGenerating] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {},
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        },
    });

    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError,
    } = useFetch(saveResume);

    // Watch form fields for preview updates
    const formValues = watch();

    useEffect(() => {
        if (initialContent) setActiveTab("preview");
    }, [initialContent]);

    // Update preview content when form values change
    useEffect(() => {
        if (activeTab === "edit") {
            const newContent = getCombinedContent();
            setPreviewContent(newContent ? newContent : initialContent);
        }
    }, [formValues, activeTab]);

    // Handle save result
    useEffect(() => {
        if (saveResult && !isSaving) {
            toast.success("Resume saved successfully!");
        }
        if (saveError) {
            toast.error(saveError.message || "Failed to save resume");
        }
    }, [saveResult, saveError, isSaving]);

    const getContactMarkdown = () => {
        const { contactInfo } = formValues;
        const parts = [];
        if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
        if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
        if (contactInfo.linkedin)
            parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
        if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

        return parts.length > 0
            ? `## <div align="center">${user?.name}</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
            : "";
    };

    const getCombinedContent = () => {
        const { summary, skills, experience, education, projects } = formValues;
        const sections = [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}`,
            skills && `## Skills\n\n${skills}`,
            entriesToMarkdown(experience, "Work Experience"),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
        ].filter(Boolean);

        return sections.join("\n\n");
    };

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            // Get the existing preview element
            const previewElement = document.querySelector('.w-md-editor-preview');
            if (!previewElement) {
                throw new Error('Preview element not found');
            }

            // Create a temporary container for PDF generation
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '-9999px';
            tempContainer.style.width = '210mm'; // A4 width
            tempContainer.style.padding = '20mm';
            tempContainer.style.backgroundColor = '#ffffff';
            tempContainer.style.color = '#000000';
            tempContainer.style.fontFamily = 'Arial, sans-serif';
            tempContainer.style.fontSize = '12pt';
            tempContainer.style.lineHeight = '1.5';
            
            // Clone the preview content and remove any problematic styles
            const content = previewElement.innerHTML;
            tempContainer.innerHTML = content;
            
            // Remove any gradient or modern CSS color functions
            const elements = tempContainer.getElementsByTagName('*');
            for (let element of elements) {
                const htmlElement = element as HTMLElement;
                const style = window.getComputedStyle(htmlElement);
                if (style.background.includes('gradient') || style.background.includes('oklch')) {
                    htmlElement.style.background = '#ffffff';
                }
                if (style.color.includes('oklch')) {
                    htmlElement.style.color = '#000000';
                }
            }
            
            document.body.appendChild(tempContainer);

            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                removeContainer: true,
                allowTaint: true,
                foreignObjectRendering: true,
                imageTimeout: 0,
                onclone: (clonedDoc) => {
                    const clonedContainer = clonedDoc.querySelector('div');
                    if (clonedContainer) {
                        clonedContainer.style.width = '210mm';
                        clonedContainer.style.padding = '20mm';
                        clonedContainer.style.backgroundColor = '#ffffff';
                        clonedContainer.style.color = '#000000';
                        clonedContainer.style.fontFamily = 'Arial, sans-serif';
                        clonedContainer.style.fontSize = '12pt';
                        clonedContainer.style.lineHeight = '1.5';
                        
                        // Remove any gradient or modern CSS color functions in the cloned document
                        const clonedElements = clonedContainer.getElementsByTagName('*');
                        for (let element of clonedElements) {
                            const htmlElement = element as HTMLElement;
                            const style = window.getComputedStyle(htmlElement);
                            if (style.background.includes('gradient') || style.background.includes('oklch')) {
                                htmlElement.style.background = '#ffffff';
                            }
                            if (style.color.includes('oklch')) {
                                htmlElement.style.color = '#000000';
                            }
                        }
                    }
                }
            });

            // Clean up
            document.body.removeChild(tempContainer);

            const imgData = canvas.toDataURL('image/jpeg', 0.98);

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const formattedContent = previewContent
                .replace(/\n/g, "\n") // Normalize newlines
                .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
                .replace(/\u{1F4E7}/gu, "📧") // Fix emoji replacement
                .replace(/\u{1F4F1}/gu, "📱")
                .replace(/\u{1F4BC}/gu, "💼")
                .replace(/\u{1F426}/gu, "🐦")
                .trim();
    
            await saveResumeFn(formattedContent);
        } catch (error) {
            console.error("Save error:", error);
        }
    };
    

    return (
        <div data-color-mode="light" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <h1 className="font-bold gradient-title text-5xl md:text-6xl">
                    Resume Builder
                </h1>
                <div className="space-x-2">
                    <Button
                        variant="destructive"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save
                            </>
                        )}
                    </Button>
                    {/* <Button onClick={generatePDF} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                Download PDF
                            </>
                        )}
                    </Button> */}
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        {...register("contactInfo.email")}
                                        type="email"
                                        placeholder="your@email.com"
                                    />
                                    {errors.contactInfo?.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.contactInfo.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Mobile Number</label>
                                    <Input
                                        {...register("contactInfo.mobile")}
                                        type="tel"
                                        placeholder="+1 234 567 8900"
                                    />
                                    {errors.contactInfo?.mobile && (
                                        <p className="text-sm text-red-500">
                                            {errors.contactInfo.mobile.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">LinkedIn URL</label>
                                    <Input
                                        {...register("contactInfo.linkedin")}
                                        type="url"
                                        placeholder="https://linkedin.com/in/your-profile"
                                    />
                                    {errors.contactInfo?.linkedin && (
                                        <p className="text-sm text-red-500">
                                            {errors.contactInfo.linkedin.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Twitter/X Profile
                                    </label>
                                    <Input
                                        {...register("contactInfo.twitter")}
                                        type="url"
                                        placeholder="https://twitter.com/your-handle"
                                    />
                                    {errors.contactInfo?.twitter && (
                                        <p className="text-sm text-red-500">
                                            {errors.contactInfo.twitter.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Professional Summary</h3>
                            <Controller
                                name="summary"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="h-32"
                                        placeholder="Write a compelling professional summary..."
                                    />
                                )}
                            />
                            {errors.summary && (
                                <p className="text-sm text-red-500">{errors.summary.message}</p>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Skills</h3>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="h-32"
                                        placeholder="List your key skills..."
                                    />
                                )}
                            />
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Work Experience</h3>
                            <Controller
                                name="experience"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Experience"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.experience && (
                                <p className="text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Education</h3>
                            <Controller
                                name="education"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Education"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.education && (
                                <p className="text-sm text-red-500">
                                    {errors.education.message}
                                </p>
                            )}
                        </div>

                        {/* Projects */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Projects</h3>
                            <Controller
                                name="projects"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Project"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.projects && (
                                <p className="text-sm text-red-500">
                                    {errors.projects.message}
                                </p>
                            )}
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="preview">
                    {activeTab === "preview" && (
                        <Button
                            variant="link"
                            type="button"
                            className="mb-2"
                            onClick={() =>
                                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                            }
                        >
                            {resumeMode === "preview" ? (
                                <>
                                    <Edit className="h-4 w-4" />
                                    Edit Resume
                                </>
                            ) : (
                                <>
                                    <Monitor className="h-4 w-4" />
                                    Show Preview
                                </>
                            )}
                        </Button>
                    )}

                    {activeTab === "preview" && resumeMode !== "preview" && (
                        <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-sm">
                                You will lose editied markdown if you update the form data.
                            </span>
                        </div>
                    )}
                    <div className="border rounded-lg">
                        <MDEditor
                            value={previewContent}
                            onChange={() => setPreviewContent}
                            height={800}
                            preview={resumeMode}
                        />
                    </div>
                    <div className="hidden">
                        <div id="resume-pdf" className="bg-white">
                            <MDEditor.Markdown
                                source={previewContent}
                                style={{
                                    background: '#ffffff',
                                    color: '#000000',
                                    padding: '20px',
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '12pt',
                                    lineHeight: '1.5',
                                }}
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}