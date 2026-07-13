export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import PricingSection from "@/src/components/Home/PricingSection";
import SubscriptionClient from "@/src/components/Home/SubscriptionClient";
import { getUserInfo } from "@/src/service/auth.service";
import { Subscription } from "@/src/types/payment.types";
import { ChevronLeft, Crown } from "lucide-react";
import Link from "next/link";

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
        <div className="flex items-center gap-5 mb-3">
          <Link href="/profile">
            <Button size="icon-lg" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Crown className="size-5 text-primary" />
            Subscription
          </h1>
        </div>
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