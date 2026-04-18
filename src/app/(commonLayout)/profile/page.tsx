export const dynamic = "force-dynamic";


import ProfileClient from "@/src/components/modules/profile/profileClient";
import { getUserInfo } from "@/src/service/auth.service";



export default async function ProfilePage() {
  const user = await getUserInfo();

  return (
    <ProfileClient user={user} />
  );
}