"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Clapperboard,
  Eye,
  EyeOff,
  Film,
  Key,
  Loader2,
  LogIn,
  Mail,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { loginAction } from "@/src/app/(commonLayout)/(authPages)/login/_action";
import { ILoginProps, loginZodSchema } from "@/src/zod/auth.validation";
import AppField from "../../../app/shared/from/AppField";

interface LoginFormProps {
  redirectPath?: string;
}

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

export default function LoginForm({ redirectPath }: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginProps) => loginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const res = (await mutateAsync(value)) as any;

        if (res?.message === "Login failed: Invalid email or password") {
          toast.warning("Account not found. Please register first.");
          return router.push("/register");
        }

        if (res?.success === false) {
          setServerError(res?.message || "Invalid credentials. Please try again.");
          return;
        }

        toast.success("Welcome back to Cinema Tube!");
        const destination = res?.redirectPath || redirectPath || "/profile";
        router.push(destination);
        router.refresh();
      } catch (error: any) {
        setServerError(`Login failed: ${error.message || "An unexpected error occurred."}`);
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
        {/* Header Branding */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <Film className="size-7 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
              Cinema Tube Access
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign in to access your watchlist, reviews, and streams.
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
          <motion.div variants={itemVariants}>
            <form.Field
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  prepend={<Mail className="size-4 text-slate-400" />}
                  field={field}
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  className="space-y-1.5"
                />
              )}
            </form.Field>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form.Field
              name="password"
              validators={{ onChange: loginZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  prepend={<Key className="size-4 text-slate-400" />}
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

          {/* Forgot Password */}
          <motion.div variants={itemVariants} className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 text-sm font-semibold rounded-lg shadow-md transition-all cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="size-4" /> Log In
                </span>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Demo Credentials */}
        <motion.div variants={itemVariants}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full text-xs text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200 transition"
            onClick={() => {
              form.setFieldValue("email", "superadmin@gmail.com");
              form.setFieldValue("password", "123456789");
              toast.info("Demo credentials filled — click Log In to proceed");
            }}
          >
            <Sparkles className="size-3.5 mr-1.5 text-amber-400" /> Use Demo Credentials
          </Button>
        </motion.div>

        {/* Footer Link */}
        <motion.div variants={itemVariants} className="pt-2 border-t border-slate-800/80 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:text-indigo-300 transition-colors">
            Register now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}