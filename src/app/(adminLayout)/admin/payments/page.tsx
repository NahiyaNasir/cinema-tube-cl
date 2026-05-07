import PaymentClient from "@/src/components/modules/Admin/payment/paymentclient";


export const metadata = {
  title: "Payments History | Cinema Tube Admin",
  description: "Manage all payment-related activities.",
};

export default function AdminPaymentsPage() {
  return (
    <PaymentClient/>
  );
}