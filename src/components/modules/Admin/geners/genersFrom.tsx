/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectValue, UpdaterFn, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Genre } from "@/src/types/media.types";
import { adminCreateGenre, adminUpdateGenre } from "@/src/service/admin.service";
import { createGenreSchema } from "@/src/zod/createGenere.scheme.validation";

export const GenreForm = ({
  initialData,
  onSuccess,
  onCancel,
  isModal,
}: {
  initialData?: Genre | null;
  onSuccess: () => void;
  onCancel: () => void;
  isModal?: boolean;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: createMutateAsync, isPending: createIsPending } =
    useMutation({
      mutationFn: (payload: any) => adminCreateGenre(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-genres"] });
      },
    });

  const { mutateAsync: updateMutateAsync, isPending: updateIsPending } =
    useMutation({
      mutationFn: (payload: any) => adminUpdateGenre(initialData?.id, payload),
    });

  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      isPublished: initialData?.isPublished || true,
      isFeatured: initialData?.isFeatured || false,
    },
    onSubmit: async ({ value }) => {
      try {
        if (isModal) {
          const res = await updateMutateAsync(value);
          if (res.success) {
            toast.success("Genre updated successfully");
            return onSuccess();
          } else {
            toast.error(res.message || "Failed to update genre");
          }
        } else {
          const res = await createMutateAsync(value);
          if (res.success) {
            toast.success("Genre created successfully");
            return router.push("/admin/genres");
          } else {
            toast.error(res.message || "Failed to create genre");
          }
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create genre");
      }
    },
  });

  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ✅ name */}
            <form.Field
              name="name"
              validators={{ onSubmit: createGenreSchema.shape.name }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Genre Name *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      const slug = e.target.value
                        .toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "");
                      form.setFieldValue("slug", slug);
                    }}
                    placeholder="e.g. Science Fiction"
                    className="h-11"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em className="text-[11px] text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              )}
            </form.Field>

            {/* ✅ slug */}
            <form.Field
              name="slug"
              validators={{ onSubmit: createGenreSchema.shape.slug }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>URL Slug *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. sci-fi"
                    className="h-11 font-mono text-sm"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em className="text-[11px] text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

    

      
        </div>

        <div className="flex flex-col md:flex-row items-center gap-9 col-span-2">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-0.5">
              <Label className="text-sm">Visibility Status</Label>
              <p className="text-xs text-muted-foreground">
                Make this genre visible to public users.
              </p>
            </div>
            {/* ✅ isPublished */}
            <form.Field name="isPublished">
              {(field) => (
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked: any) => field.handleChange(checked as any)}
                />
              )}
            </form.Field>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center justify-between w-full">
            <div className="space-y-0.5">
              <Label className="text-sm">Featured Genre</Label>
              <p className="text-xs text-muted-foreground">
                Highlight this genre in the discovery section.
              </p>
            </div>
            {/* ✅ isFeatured */}
            <form.Field name="isFeatured">
              {(field) => (
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked: boolean | UpdaterFn<ObjectValue<never, { name: string; slug: string; description: string; image: string; isPublished: true; isFeatured: boolean; }, "isFeatured">, ObjectValue<never, { name: string; slug: string; description: string; image: string; isPublished: true; isFeatured: boolean; }, "isFeatured">>) => field.handleChange(checked)}
                />
              )}
            </form.Field>
          </div>
        </div>
      </div>

      <div className="mt-13 flex items-center justify-end gap-5">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel || (() => router.back())}
          className="h-11 px-6"
        >
          Back
        </Button>
        {initialData ? (
          <Button
            type="submit"
            disabled={updateIsPending}
            className="h-11 px-8 gap-2 min-w-35"
          >
            {updateIsPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save />}
            Update Genre
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={createIsPending}
            className="h-11 px-8 gap-2 min-w-35"
          >
            {createIsPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus />}
            Create Genre
          </Button>
        )}
      </div>
    </form>
  );
};