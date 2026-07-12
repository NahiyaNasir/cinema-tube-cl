export const metadata = {
  title: "Privacy Policy | Cinema Tube",
  description: "How Cinema Tube collects, uses, and protects your data.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly, such as your name, email address, and payment details when you register or make a purchase. We also collect usage data, including watch history, ratings, reviews, and device information, to improve your experience.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to provide and improve Cinema Tube, process payments, personalize recommendations, communicate with you about your account, and maintain the security of the platform.`,
  },
  {
    title: "3. Cookies & Tracking",
    body: `Cinema Tube uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how the service is used. You can control cookies through your browser settings.`,
  },
  {
    title: "4. Sharing of Information",
    body: `We do not sell your personal information. We may share data with trusted service providers who help us operate the platform (such as payment processors), or when required by law.`,
  },
  {
    title: "5. Data Security",
    body: `We use industry-standard measures, including password hashing and encrypted connections, to protect your data. No method of transmission or storage is completely secure, but we work to safeguard your information.`,
  },
  {
    title: "6. Your Rights",
    body: `You can review, update, or delete your account information at any time from your profile settings. You may also contact us to request a copy of your data or ask us to delete your account.`,
  },
  {
    title: "7. Children's Privacy",
    body: `Cinema Tube is not directed at children under 13, and we do not knowingly collect personal information from children under that age.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the platform.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have any questions about this Privacy Policy or how your data is handled, please reach out through our contact page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}