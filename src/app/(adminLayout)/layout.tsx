export const dynamic = "force-dynamic";





import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/src/components/modules/Admin/AdminSidebar";
import { getUserInfo } from "@/src/service/auth.service";
import { redirect } from "next/navigation";
import { MobileSidebarTrigger } from "../shared/MobileSidebarTrigger";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset className="bg-background/95">
        <div className="p-5">{children}</div>
      </SidebarInset>
      <MobileSidebarTrigger />
    </SidebarProvider>
  );
}