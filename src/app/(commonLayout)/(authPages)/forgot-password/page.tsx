

"use client";

import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { forgotPasswordAction } from "./_action";

export default function ForgotPasswordPage() {
  const [serverMsg, setServerMsg] = useState<{ success?: boolean; message?: string }>({});

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const result = await forgotPasswordAction({ email: value.email });
      setServerMsg(result);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Forgot Password?</CardTitle>
            <CardDescription>
                Enter your email address below and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {serverMsg.message ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`p-4 rounded-md mb-4 text-sm text-center font-medium ${
                  serverMsg.success ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
                }`}
              >
                {serverMsg.message}
              </motion.div>
            ) : null}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Email is required" : !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    {field.state.meta.errors ? (
                      <p className="text-xs text-destructive mt-1">{field.state.meta.errors.join(", ")}</p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" className="w-full gap-2" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}