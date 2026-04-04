import VerifyEmailSkeleton from "@/src/components/modules/auth/VerifyEmailSkeleton";


export default function Loading() {
  return (
    <div className="container mx-auto h-screen">
      <VerifyEmailSkeleton />
    </div>
  );
}