import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/src/service/auth.service";
import SettingsForm from "@/src/components/modules/profile/SettingFrom";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings | Cinema Tube",
};

export default async function SettingsPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login?redirect=/profile/settings");
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-5 mb-3">
          <Link href="/profile">
            <Button size="icon-lg" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your account information and security.
        </p>
        <SettingsForm user={user} />
      </div>
    </div>
  );
}