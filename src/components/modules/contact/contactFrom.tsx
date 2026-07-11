/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactZodSchema, IContactProps } from "@/src/zod/contact.validation";
import AppField from "../../../app/shared/from/AppField";
import AppSubmitButton from "../../../app/shared/from/AppButtonSubmit";
import { submitContactMessage } from "@/src/app/(commonLayout)/contact/_action";

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as any).message);
  }
  return String(error);
};

export default function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IContactProps) => submitContactMessage(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value, formApi }) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        const res = await mutateAsync(value);

        if (res.success) {
          setSuccessMessage(res.message);
          toast.success(res.message);
          formApi.reset();
        } else {
          setServerError(res.message);
          toast.error(res.message);
        }
      } catch (error: any) {
        const message = error?.message || "Failed to send your message. Please try again.";
        setServerError(message);
        toast.error(message);
      }
    },
  });

  return (
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
        validators={{ onChange: contactZodSchema.shape.name }}
      >
        {(field) => (
          <AppField
            prepend={<User className="size-5 text-muted-foreground" />}
            field={field}
            label="Name"
            type="text"
            placeholder="Enter your full name"
          />
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{ onChange: contactZodSchema.shape.email }}
      >
        {(field) => (
          <AppField
            prepend={<Mail className="size-5 text-muted-foreground" />}
            field={field}
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{ onChange: contactZodSchema.shape.message }}
      >
        {(field) => {
          const firstError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0
              ? getErrorMessage(field.state.meta.errors[0])
              : null;
          const hasError = firstError !== null;

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor={field.name}
                className={hasError ? "text-destructive" : undefined}
              >
                <MessageSquare className="size-4 mr-1 inline text-muted-foreground" />
                Message
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Tell us how we can help..."
                rows={5}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
              {hasError && (
                <p
                  id={`${field.name}-error`}
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {firstError}
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}
      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting || isPending}
            pendingLabel="Sending..."
            disabled={!canSubmit}
          >
            Send Message
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}