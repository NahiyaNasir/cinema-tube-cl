"use client"; // Required for click handlers

import { Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface AdminReviewActionButtonsProps {
  reviewId: string;
  compact?: boolean;
}

export function AdminReviewActionButtons({ 
  reviewId, 
  compact 
}: AdminReviewActionButtonsProps) {
  
  const handleApprove = async () => {
    // Logic: Call your API or Server Action to set status to "PUBLISHED"
    console.log("Approving review:", reviewId);
  };

  const handleReject = async () => {
    // Logic: Call your API or Server Action to delete or mark as "REJECTED"
    console.log("Rejecting review:", reviewId);
  };

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
      >
        <Check className="size-3 mr-1" /> Approve
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs border-red-500/20 text-red-600 hover:bg-red-50"
        onClick={handleReject}
      >
        <X className="size-3 mr-1" /> Reject
      </Button>
    </div>
  );
}