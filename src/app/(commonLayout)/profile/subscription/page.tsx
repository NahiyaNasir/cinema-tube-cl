export const dynamic = 'force-dynamic';
import PricingSection from "@/src/components/Home/PricingSection";
import SubscriptionClient from "@/src/components/Home/SubscriptionClient";
import { getUserInfo } from "@/src/service/auth.service";
import { Subscription } from "@/src/types/payment.types";
import { Crown } from "lucide-react";

export default async function SubscriptionPage() {
  const user = await getUserInfo();
  // console.log(user);
  const subscription = user?.subscriptions?.[0] as Subscription;
  // console.log(subscription,"subsccc");

  const isActive =
    subscription?.status === "ACTIVE" && subscription?.plan !== "FREE";

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Crown className="size-5 text-primary" />
          Subscription
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan and billing details.
        </p>
      </div>

      {/* Pass data to the Client Component */}
      <SubscriptionClient subscription={subscription} isActive={isActive} />

      {!isActive && (
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Upgrade Your Plan</h2>
          <PricingSection user={user!} />
        </div>
      )}
    </div>
  );
}