/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImageIcon, KeyRound, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import AppField from "../../../app/shared/from/AppField";
import AppSubmitButton from "../../../app/shared/from/AppButtonSubmit";
import { passwordSchema } from "@/src/zod/auth.validation";
import {
  changePasswordAction,
  updateProfileAction,
} from "@/src/app/(commonLayout)/profile/settings/_action";
import { IProfileResponse } from "@/src/types/profile.types";

const profileInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  image: z.union([z.url("Must be a valid URL."), z.literal("")]),
});

export default function SettingsForm({ user }: { user: IProfileResponse }) {
  return (
    <div className="max-w-2xl space-y-10">
      <ProfileInfoSection user={user} />
      <div className="h-px bg-border" />
      <PasswordSection />
    </div>
  );
}

function ProfileInfoSection({ user }: { user: IProfileResponse }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { name: string; image?: string }) =>
      updateProfileAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
    onSubmit: async ({ value }) => {
      const res = await mutateAsync(value);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="size-4" />
          Profile Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Update your display name and profile photo.
        </p>
      </div>

      <form.Field name="image">
        {(field) => (
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={field.state.value || undefined} />
              <AvatarFallback>
                {(user?.name || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="image">
                <ImageIcon className="size-3.5 mr-1 inline text-muted-foreground" />
                Profile image URL
              </Label>
              <input
                id="image"
                name="image"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="https://..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
          </div>
        )}
      </form.Field>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="name"
          validators={{ onChange: profileInfoSchema.shape.name }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Full name"
              type="text"
              placeholder="Your name"
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Saving..."
              disabled={!canSubmit}
            >
              Save Changes
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}

function PasswordSection() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => changePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
     currentPassword : "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value, formApi }) => {
      setServerError(null);
      const res = await mutateAsync(value);
      if (res.success) {
        toast.success(res.message);
        formApi.reset();
      } else {
        setServerError(res.message);
        toast.error(res.message);
      }
    },
  });

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <KeyRound className="size-4" />
          Change Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Update your account password. You&apos;ll stay logged in on this
          device.
        </p>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="currentPassword"
          validators={{ onChange: passwordSchema.shape.currentPassword }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Current password"
              type="password"
              placeholder="Enter your current password"
            />
          )}
        </form.Field>

        <form.Field
          name="newPassword"
          validators={{ onChange: passwordSchema.shape.newPassword }}
        >
          {(field) => (
            <AppField
              field={field}
              label="New password"
              type="password"
              placeholder="At least 8 characters"
            />
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <AppField
              field={field}
              label="Confirm new password"
              type="password"
              placeholder="Re-enter new password"
            />
          )}
        </form.Field>

        {serverError && (
          <p className="text-sm text-red-500">{serverError}</p>
        )}

        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Updating..."
              disabled={!canSubmit}
            >
              Update Password
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}
