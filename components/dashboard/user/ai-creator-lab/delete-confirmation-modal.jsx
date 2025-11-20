// components/dashboard/user/ai-creator-lab/delete-confirmation-modal.jsx
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteAiGenerationMutation } from "@/redux/store/api/aiCreatorApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DeleteConfirmationModal({
  open,
  onOpenChange,
  generation,
}) {
  const [deleteGeneration, { isLoading, isSuccess, isError, error }] =
    useDeleteAiGenerationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Generation deleted successfully");
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to delete generation");
    }
  }, [isError, error]);

  const handleDelete = async () => {
    if (!generation?.id) return;
    await deleteGeneration({ id: generation.id });
  };

  const getGenerationType = () => {
    if (!generation) return "generation";
    const type = generation.task_type || "generation";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {getGenerationType()} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
