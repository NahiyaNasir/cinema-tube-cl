"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AtSign,
  Clapperboard,
  Eye,
  EyeOff,
  Key,
  Loader2,
  ShieldCheck,
  User2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { registerAction } from "@/src/app/(commonLayout)/(authPages)/register/_action";
import { IRegisterProps, registerZodSchema } from "@/src/zod/auth.validation";
import AppField from "../../../app/shared/from/AppField";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (rememberMe) {
      toast.info("Session will be remembered for 30 days");
    }
  }, [rememberMe]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterProps) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: false,
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const res = (await mutateAsync(value)) as any;

        if (res?.success === false) {
          setServerError(res?.message || "Registration failed. Please try again.");
          return;
        }

        toast.success("Account created! Check your email for the verification code.");
        // Redirect directly to the verification page with email prepopulated
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (error: any) {
        setServerError(error?.message || "An unexpected error occurred during registration.");
      }
    },
  });

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-slate-900/75 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <Clapperboard className="size-7" />
            </div>
          </div>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
              Join Cinema Tube
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Start streaming, rating movies, and curating your custom watchlist.
          </p>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg"
            >
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Name */}
          <motion.div variants={itemVariants}>
            <form.Field
              name="name"
              validators={{ onChange: registerZodSchema.shape.name }}
            >
              {(field) => (
                <AppField
                  prepend={<User2 className="size-4 text-slate-400" />}
                  field={field}
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  className="space-y-1.5"
                />
              )}
            </form.Field>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <form.Field
              name="email"
              validators={{ onChange: registerZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  prepend={<AtSign className="size-4 text-slate-400" />}
                  field={field}
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  className="space-y-1.5"
                />
              )}
            </form.Field>
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <form.Field
              name="password"
              validators={{ onChange: registerZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  prepend={<Key className="size-4 text-slate-400" />}
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  append={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  }
                  className="space-y-1.5"
                />
              )}
            </form.Field>
          </motion.div>

          {/* Checkboxes */}
          <motion.div variants={itemVariants} className="space-y-3 pt-1">
            <form.Field name="acceptTerms">
              {(field) => (
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms-conditions"
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(!!checked)}
                    />
                    <Label
                      htmlFor="terms-conditions"
                      className="text-xs text-slate-300 font-normal cursor-pointer"
                    >
                      I accept the{" "}
                      <Link href="/terms" className="text-indigo-400 hover:underline">
                        Terms & Conditions
                      </Link>
                    </Label>
                  </div>
                  {field.state.meta.errors?.[0] && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {field.state.meta.errors[0] as string}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-session"
                    checked={field.state.value}
                    onCheckedChange={(checked) => {
                      field.handleChange(!!checked);
                      setRememberMe(!!checked);
                    }}
                  />
                  <Label
                    htmlFor="remember-session"
                    className="text-xs text-slate-400 font-normal cursor-pointer"
                  >
                    Remember me on this device
                  </Label>
                </div>
              )}
            </form.Field>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
            <Button
              type="submit"
              disabled={isPending || !form.state.values.acceptTerms}
              className="w-full h-11 text-sm font-semibold rounded-lg shadow-md transition-all cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="size-4" /> Create Account
                </span>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Footer Link */}
        <motion.div variants={itemVariants} className="pt-2 border-t border-slate-800/80 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Log in here
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}