import { redirect } from "next/navigation";
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
        <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your account information and security.
        </p>
        <SettingsForm user={user} />
      </div>
    </div>
  );
}
