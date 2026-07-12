"use client";

import { Check, Trash2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminUpdateReviewStatus } from "@/src/service/admin.service";

interface AdminReviewActionButtonsProps {
  reviewId: string;
  compact?: boolean;
}

export function AdminReviewActionButtons({
  reviewId,
  compact,
}: AdminReviewActionButtonsProps) {
  const queryClient = useQueryClient();

  const { mutate: updateReviewStatus, isPending } = useMutation({
    mutationFn: (status: "APPROVED" | "UNPUBLISHED") =>
      adminUpdateReviewStatus(reviewId, status),
    onSuccess: (_, status) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success(
        status === "APPROVED" ? "Review approved" : "Review rejected"
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update review status"
      );
    },
  });

  const handleApprove = () => updateReviewStatus("APPROVED");

  const handleReject = () => updateReviewStatus("UNPUBLISHED");

  if (compact) {
    return (
      <div className="flex flex-col gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={handleApprove}
                disabled={isPending}
              >
                <Check className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Approve</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleReject}
                disabled={isPending}
              >
                <Trash2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reject</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs border-emerald-500/20 text-emerald-600 hover:bg-emerald-50"
        onClick={handleApprove}
        disabled={isPending}
      >
        <Check className="size-3 mr-1" /> Approve
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs border-red-500/20 text-red-600 hover:bg-red-50"
        onClick={handleReject}
        disabled={isPending}
      >
        <X className="size-3 mr-1" /> Reject
      </Button>
    </div>
  );
}