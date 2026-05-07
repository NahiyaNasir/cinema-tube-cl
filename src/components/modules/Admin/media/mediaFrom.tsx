/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Loader2, Image as ImageIcon, DollarSign, XCircle } from "lucide-react";
import { } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Separator } from "@/components/ui/separator";
import { adminCreateMedia, adminUpdateMedia } from "@/src/service/admin.service";
import { Genre } from "@/src/types/media.types";







const PRICING_OPTIONS = ["FREE", "PREMIUM", "RENTAL"];

interface MediaFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function MediaForm({
  initialData,
  isEditing = false,
}: MediaFormProps) {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) =>
      adminCreateMedia(payload),
  });

  const { mutateAsync: updateMedia, isPending: isUpdating } = useMutation({
    mutationFn: (payload) =>
      adminUpdateMedia(initialData?.id, payload),
  });

  console.log("initialData : ", initialData);

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.synopsis || "",
      type: initialData?.type || "MOVIE",
      releaseYear: String(initialData?.releaseYear || ""),
      director: initialData?.director || "",
      posterUrl: initialData?.posterUrl || "",
      backdropUrl: initialData?.backdropUrl || "",
      trailerUrl: initialData?.trailerUrl || "",
      streamingUrl: initialData?.streamingUrl || "",
      runtimeMinutes: String(initialData?.runtimeMinutes || ""),
      seasons: String(initialData?.seasons || ""),
      pricing: initialData?.pricing || "FREE",
      rentalPrice: String(initialData?.rentalPrice || ""), // Added
      buyPrice: String(initialData?.buyPrice || ""), // Added
      isPublished: initialData?.isPublished ?? false,
      isFeatured: initialData?.isFeatured ?? false,
      cast: initialData?.cast || [],
      genres: initialData?.genres
        ? initialData?.genres?.map((p: Genre) => p.id)
        : [],

    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditing) {
          const res = await updateMedia(value);
          console.log("Media Payload", res);
          toast.success("Media updated successfully");
          router.push("/admin/media");
          router.refresh();
        } else {
          const res = await mutateAsync(value);
          console.log("Media Payload", res);
          toast.success("Media created successfully");
          router.push("/admin/media");
          router.refresh();
        }
        queryClient.invalidateQueries({ queryKey: ["admin-medias"] });
      } catch (err: any) {
        toast.error(
          `${isEditing ? "Failed to update" : "Failed to create"} media`,
        );
      }
    },
  });

  return (
  <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8 bg-card p-6 rounded-lg border shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Slug */}
        <form.Field name="slug">
          {(field) => (
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Media Type */}
        <form.Field name="type">
          {(field) => (
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MOVIE">Movie</SelectItem>
                  <SelectItem value="SERIES">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Release Year */}
        <form.Field name="releaseYear">
          {(field) => (
            <div className="space-y-2">
              <Label>Release Year</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Switches */}
      <div className="flex gap-6 border p-4 rounded-md">
        <form.Field name="isPublished">
          {(field) => (
            <div className="flex items-center gap-2">
              <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
              <Label>Published</Label>
            </div>
          )}
        </form.Field>
        
        <form.Field name="isFeatured">
          {(field) => (
            <div className="flex items-center gap-2">
              <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
              <Label>Featured</Label>
            </div>
          )}
        </form.Field>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/media")}>
          <XCircle className="h-4 w-4 mr-2" /> Cancel
        </Button>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button 
              type="submit" 
              disabled={!canSubmit || isSubmitting  || isUpdating}
            >
              {(isSubmitting|| isUpdating) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Update Media" : "Create Media"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}