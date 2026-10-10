"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  resendOtpAction,
  verifyEmailAction,
} from "@/src/app/(commonLayout)/(authPages)/verify-email/_action";
import {
  IVerifyEmailProps,
  verifyEmailZodSchema,
} from "@/src/zod/auth.validation";

export default function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Resend cooldown timer (60 seconds)
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Verification Mutation
  const { mutateAsync: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: async (payload: IVerifyEmailProps) => {
      return await verifyEmailAction(payload);
    },
  });

  // Resend OTP Mutation
  const { mutateAsync: resendOtp, isPending: isResending } = useMutation({
    mutationFn: async () => {
      if (!email) throw new Error("Email address is missing.");
      return await resendOtpAction({
        email,
        type: "email-verification",
      });
    },
    onSuccess: (res: any) => {
      if (res?.success === false) {
        toast.error(res?.message || "Failed to resend code.");
        return;
      }
      toast.success("Verification code resent to your inbox!");
      setCountdown(60);
      setCanResend(false);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Unable to resend OTP at this time.");
    },
  });

  // Form handling
  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.email) {
        toast.error("Email is missing. Please sign up or login again.");
        return;
      }

      try {
        const res = (await verifyOtp(value)) as any;

        // Check verification status safely from various response formats
        const isVerified =
          res?.data?.user?.emailVerified ||
          res?.data?.status ||
          res?.user?.emailVerified ||
          res?.success;

        if (isVerified) {
          toast.success("Email verified successfully! Welcome aboard.");
          router.push("/profile");
          router.refresh();
          return;
        }

        toast.error(res?.message || "Invalid or expired verification code.");
      } catch (error: any) {
        toast.error(error?.message || "Verification failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-6">
        
        {/* Header Icon */}
        <div className="relative">
          <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
            <ShieldCheck className="size-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-500/20 text-amber-400 p-1 rounded-full border border-amber-500/30">
            <Mail className="size-3.5" />
          </div>
        </div>

        {/* Title & Email Display */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
              Verification Required
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Verify Your Email
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            We’ve sent a 6-digit confirmation code to:
          </p>
          {email ? (
            <div className="inline-block bg-slate-800/80 border border-slate-700/60 rounded-md px-3 py-1 text-xs font-mono text-primary truncate max-w-full">
              {email}
            </div>
          ) : (
            <p className="text-xs text-rose-400">No email found in URL.</p>
          )}
        </div>

        {/* OTP Input Form */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="w-full space-y-6"
        >
          <form.Field
            name="otp"
            validators={{ onChange: verifyEmailZodSchema.shape.otp }}
          >
            {(field) => (
              <div className="flex flex-col items-center justify-center space-y-3">
                <InputOTP
                  autoFocus
                  maxLength={6}
                  value={field.state.value}
                  onChange={(val) => {
                    field.handleChange(val);
                    // Auto-submit as soon as all 6 digits are typed:
                    if (val.length === 6) {
                      setTimeout(() => form.handleSubmit(), 100);
                    }
                  }}
                  className="gap-2 sm:gap-3"
                >
                  <InputOTPGroup className="gap-1.5 sm:gap-2">
                    <InputOTPSlot index={0} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                    <InputOTPSlot index={1} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                    <InputOTPSlot index={2} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                  </InputOTPGroup>

                  <InputOTPSeparator className="text-slate-600" />

                  <InputOTPGroup className="gap-1.5 sm:gap-2">
                    <InputOTPSlot index={3} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                    <InputOTPSlot index={4} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                    <InputOTPSlot index={5} className="size-10 sm:size-11 text-base sm:text-lg rounded-lg border-slate-700 bg-slate-950 font-bold" />
                  </InputOTPGroup>
                </InputOTP>

                {field.state.meta.errors?.[0] && (
                  <p role="alert" className="text-xs text-rose-400 font-medium">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isVerifying || form.state.values.otp.length !== 6}
            className="w-full h-11 text-sm font-semibold rounded-lg shadow-md transition-all"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Verifying Code...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Verify OTP <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Resend Actions */}
        <div className="pt-2 border-t border-slate-800/80 w-full text-center space-y-2">
          <p className="text-xs text-slate-400">
            Didn&apos;t receive the code?
          </p>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canResend || isResending}
            onClick={() => resendOtp()}
            className="text-xs font-medium text-primary hover:text-primary/80 transition"
          >
            {isResending ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="size-3 animate-spin" /> Sending...
              </span>
            ) : canResend ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="size-3" /> Resend Code
              </span>
            ) : (
              <span className="text-muted-foreground">
                Resend code in <strong className="text-white">{countdown}s</strong>
              </span>
            )}
          </Button>
        </div>

        {/* Back Link */}
        <div className="text-xs text-muted-foreground">
          Wrong email?{" "}
          <Link href="/register" className="text-slate-300 hover:text-white underline underline-offset-4">
            Register again
          </Link>
        </div>

      </div>
    </div>
  );
}