export const dynamic = "force-dynamic";


import { Button } from "@/components/ui/button";
import PricingSection from "@/src/components/Home/PricingSection";
import { getUserInfo } from "@/src/service/auth.service";
import { IProfileResponse } from "@/src/types/profile.types";

import Link from "next/link";

export default async function SubscriptionPage() {
  const user = await getUserInfo();

  return (
    <div className="py-10">
      <div className="flex items-center justify-center">
        <Button size={"lg"} className="mx-auto -mb-9 w-fit" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      <PricingSection user={user as IProfileResponse} />
    </div>
  );
}