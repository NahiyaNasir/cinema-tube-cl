/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Crown,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Subscription } from "@/src/types/payment.types";
import { cancelSubscription } from "@/src/service/subscription.service";

export default function SubscriptionClient({
  subscription,
  isActive,
}: {
  subscription: Subscription;
  isActive: boolean;
}) {
  const router = useRouter();

  const planLabel: Record<string, string> = {
    FREE: "Free Plan",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
  };

  const formatDate = (date: string | null) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const handleCancel = async () => {
    try {
      await cancelSubscription();
      toast.success("Subscription cancelled successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to cancel");
    }
  };

  return (
    <Card className="relative overflow-hidden border-white/5 bg-white/2 backdrop-blur-xl rounded-[2rem] shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full" />

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary/60" />
          <CardTitle className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">
            Membership Details
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 relative z-10">
        {/* Main Plan Header */}
        <div className="flex items-center justify-between flex-wrap gap-6 bg-white/3 border border-white/5 p-6 rounded-[1.5rem]">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary/20 to-orange-500/10 border border-primary/20 flex items-center justify-center shadow-inner">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-neutral-400 tracking-tight">
                {planLabel[subscription?.plan ?? "FREE"] ?? "Free"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <p className="text-sm font-medium text-neutral-400">
                  {subscription?.plan === "FREE" ? "Limited Access" : "Full Premium Access"}
                </p>
              </div>
            </div>
          </div>

          <Badge
            className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
              isActive 
                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {isActive ? <CheckCircle className="w-3.5 h-3.5 mr-2" /> : <XCircle className="w-3.5 h-3.5 mr-2" />}
            {subscription?.status?.toUpperCase() ?? "INACTIVE"}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              label: "Billing Cycle Starts", 
              value: formatDate(subscription?.currentPeriodStart), 
              icon: Calendar,
              color: "text-blue-400"
            },
            { 
              label: "Renewal / Expiry", 
              value: formatDate(subscription?.currentPeriodEnd), 
              icon: Clock,
              color: "text-orange-400"
            },
            { 
              label: "Payment Source", 
              value: subscription?.stripeCustomerId ? "Visa •••• 4242" : "None", 
              icon: CreditCard,
              color: "text-purple-400"
            },
            { 
              label: "Auto-Renewal Status", 
              value: subscription?.cancelAtPeriodEnd ? "Turning off soon" : "Active", 
              icon: Crown,
              color: "text-emerald-400"
            },
          ].map((item, idx) => (
            <div key={idx} className="group p-4 rounded-2xl border border-white/5 bg-white/1 hover:bg-white/4 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">{item.label}</p>
                  <p className="text-sm font-semibold text-neutral-200 mt-0.5">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cancellation Notice & Action */}
        {isActive && (
          <div className="pt-4 mt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-500">
              <AlertCircle className="w-4 h-4 text-orange-500/50" />
              <p className="text-xs italic">You can reactivate or change plans anytime.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="w-full sm:w-auto border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl px-8 transition-all active:scale-95"
            >
              Cancel Membership
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}