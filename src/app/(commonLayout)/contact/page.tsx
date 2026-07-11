import ContactForm from "@/src/components/modules/contact/contactFrom";
import { Mail, MapPin, Phone } from "lucide-react";


export const metadata = {
  title: "Contact Us | Cinema Tube",
  description: "Get in touch with the Cinema Tube team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Get in touch
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Have a question, feedback, or need help with your account? Send
            us a message and we&apos;ll get back to you as soon as we can.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-primary shrink-0" />
              <span className="text-sm">support@cinematube.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-primary shrink-0" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-primary shrink-0" />
              <span className="text-sm">123 Studio Lane, Los Angeles, CA</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}