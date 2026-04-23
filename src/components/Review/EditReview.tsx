import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ReviewForm from "./ReviewForm";

import { Edit } from "lucide-react";
import { Review } from "@/src/types/media.types";
import { IProfileResponse } from "@/src/types/profile.types";

export default function EditReviewModal({
  initialReview,
  user,
}: {
  initialReview: Review;
  user?: IProfileResponse|null;
}) {

    console.log("initialReview", initialReview);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size={"icon-lg"}>
            <Edit className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl p-7 bg-secondary">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <ReviewForm
            mediaId={initialReview.mediaId}
            user={user}
            initialReview={initialReview}
            isEdit={true}

          />
        </DialogContent>
      </Dialog>
    </>
  );
}