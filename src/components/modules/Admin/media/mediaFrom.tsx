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
import { Save, Loader2, DollarSign, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { adminCreateMedia, adminUpdateMedia, } from "@/src/service/admin.service";
import { Genre } from "@/src/types/media.types";
import GenresInMedia from "./GenresInMedia";
import { any } from "zod";


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
    mutationFn: (payload: any) => adminCreateMedia(payload),
  });

  const { mutateAsync: updateMedia, isPending: isUpdating } = useMutation({
    mutationFn: (payload: any) => adminUpdateMedia(initialData?.id, payload),
  });
  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      type: initialData?.type || "MOVIE",
      director: initialData?.director || "",
      posterUrl: initialData?.posterUrl || "",
      backdropUrl: initialData?.backdropUrl || "",
        images: initialData?.images && initialData.images.length > 0
        ? initialData.images
        : [""],
      trailerUrl: initialData?.trailerUrl || "",
      streamingUrl: initialData?.streamingUrl || "",
      pricing: initialData?.pricing || "FREE",
      rentalPrice: String(initialData?.rentalPrice || ""),
      buyPrice: String(initialData?.buyPrice || ""),
      isPublished: initialData?.isPublished ?? false,
       releaseYear: String(initialData?.releaseYear || ""),
   runtimeMinutes: initialData?.runtimeMinutes ? Number(initialData.runtimeMinutes) : undefined,

      seasons: (initialData?.seasons),
      isFeatured: initialData?.isFeatured ?? false,
      cast: initialData?.cast || [],
      genres: initialData?.genres
        ? initialData.genres.map((p: Genre) => p.id)
        : [],
    },
    onSubmit: async ({ value }) => {
       const cleanedValue = {
        ...value,
        images: (value.images || []).filter(
          (url: string) => url && url.trim().length > 0
        ),}
      try {
        if (isEditing) {
          await updateMedia(value);
          toast.success("Media updated successfully");
        } else {
          await mutateAsync(value);
          toast.success("Media created successfully");
        }
        queryClient.invalidateQueries({ queryKey: ["admin-medias"] });
        router.push("/admin/media");
        router.refresh();
      } catch (err: any) {
        toast.error(
          `${isEditing ? "Failed to update" : "Failed to create"} media`
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

        {/* Type */}
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
{/* Genres */}
<form.Field name="genres">
  {(field) => (
    <>
      <GenresInMedia field={field} initialData={initialData?.genres} />
    </>
  )}
</form.Field>

        {/* Pricing */}
        <form.Field name="pricing">
          {(field) => (
            <div className="flex flex-col gap-2 w-full">
              <Label>Pricing</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRICING_OPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Director */}
        <form.Field name="director">
          {(field) => (
            <div className="space-y-2">
              <Label>Director</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Director name"
              />
            </div>
          )}
        </form.Field>

        {/* Runtime */}
        <form.Field name="runtimeMinutes">
          {(field) => (
            <div className="space-y-2">
              <Label>Runtime (minutes)</Label>
              <Input
               type="number"
                 value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
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
                value={field.state.value }
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Seasons */}
        <form.Field name="seasons">
          {(field) => (
            <div className="space-y-2">
              <Label>Seasons</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Poster URL */}
        <form.Field name="posterUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Poster URL</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Backdrop URL */}
        <form.Field name="backdropUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Backdrop URL</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
{/* Gallery Images */}
        <form.Field name="images" mode="array">
          {(field) => (
            <div className="space-y-2">
              <Label>Gallery Images</Label>
              <div className="space-y-2">
                {field.state.value.map((_: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={field.state.value[i]}
                      placeholder="https://..."
                      onChange={(e) =>
                        field.replaceValue(i, e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => field.removeValue(i)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => field.pushValue("")}
              >
                Add Image
              </Button>
            </div>
          )}
        </form.Field>
        {/* Trailer URL */}
        <form.Field name="trailerUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Trailer URL</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Streaming URL */}
        <form.Field name="streamingUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Streaming URL</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Rental Price fields — shown only when pricing = RENTAL */}
      <form.Subscribe selector={(state) => state.values.pricing}>
        {(pricing) =>
          pricing === "RENTAL" && (
            <div className="flex items-center gap-5">
              <div className="space-y-2 w-full">
                <form.Field name="rentalPrice">
                  {(field) => (
                    <>
                      <Label className="flex items-center gap-1">
                        <DollarSign className="size-3" /> Rental Price (BDT/USD)
                      </Label>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="3.99"
                      />
                    </>
                  )}
                </form.Field>
              </div>
              <div className="space-y-2 w-full">
                <form.Field name="buyPrice">
                  {(field) => (
                    <>
                      <Label className="flex items-center gap-1">
                        <DollarSign className="size-3" /> Buy Price (BDT/USD)
                      </Label>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="14.99"
                      />
                    </>
                  )}
                </form.Field>
              </div>
            </div>
          )
        }
      </form.Subscribe>
{/* Cast Members */}
<form.Field name="cast">
  {(field) => (
    <div className="space-y-2">
      <Label>Cast Members</Label>
      <div className="space-y-3">
        {field.state.value.map((member: any, index: number) => (
          <div key={index} className="flex gap-3 items-center border p-3 rounded-md">
            <Input
              placeholder="Name"
              value={member.name}
              onChange={(e) =>
                field.handleChange(
                  field.state.value.map((m: any, i: number) =>
                    i === index ? { ...m, name: e.target.value } : m
                  )
                )
              }
            />
            <Input
              placeholder="Role"
              value={member.role}
              onChange={(e) =>
                field.handleChange(
                  field.state.value.map((m: any, i: number) =>
                    i === index ? { ...m, role: e.target.value } : m
                  )
                )
              }
            />
            <Input
              placeholder="Image URL (optional)"
              value={member.image || ""}
              onChange={(e) =>
                field.handleChange(
                  field.state.value.map((m: any, i: number) =>
                    i === index ? { ...m, image: e.target.value } : m
                  )
                )
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                field.handleChange(
                  field.state.value.filter((_: any, i: number) => i !== index)
                )
              }
            >
              <XCircle className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            field.handleChange([
              ...field.state.value,
              { name: "", role: "", image: "" },
            ])
          }
        >
          + Add Cast Member
        </Button>
      </div>
    </div>
  )}
</form.Field>
      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
            />
          </div>
        )}
      </form.Field>

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

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/media")}
        >
          <XCircle className="h-4 w-4 mr-2" /> Cancel
        </Button>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || isUpdating}
            >
              {isSubmitting || isUpdating ? (
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