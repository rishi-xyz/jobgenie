"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {  Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/src/actions/cover-letter";
import { useState } from "react";

interface CoverLetter {
  id: string;
  jobTitle: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  jobDescription: string | null;
  status: string;
  userId: string;
}

export default function CoverLetterList({ coverLetters }: { coverLetters: CoverLetter[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully");
      router.refresh();
    } catch (error: unknown) {
      toast.error("Failed to delete cover letter",error!);
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {coverLetters.map((coverLetter) => (
        <Card key={coverLetter.id}>
          <CardHeader>
            <CardTitle>{coverLetter.jobTitle}</CardTitle>
            <CardDescription>{coverLetter.companyName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Created {format(new Date(coverLetter.createdAt), "PPP")}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${coverLetter.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(coverLetter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your cover letter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}