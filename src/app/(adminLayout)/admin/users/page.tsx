import UsersClient from "@/src/components/modules/Admin/users/userClient";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "User Management | CT Admin",
  description: "Manage registered users, roles, and status.",
};

export default function AdminUsersPage() {
  return <UsersClient />;
}
