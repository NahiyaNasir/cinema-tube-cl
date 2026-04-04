import Footer from "@/src/components/Home/Footer";
import Navbar from "@/src/components/Home/Navbar";
import { getUserInfo } from "@/src/service/auth.service";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer></Footer>
    </>
  );
}