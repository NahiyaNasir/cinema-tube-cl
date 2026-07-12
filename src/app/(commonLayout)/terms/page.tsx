export const metadata = {
  title: "Terms & Conditions | Cinema Tube",
  description: "Terms and conditions for using Cinema Tube.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account or using Cinema Tube in any way, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the service.`,
  },
  {
    title: "2. Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate information when registering and keep it up to date.`,
  },
  {
    title: "3. Subscriptions & Purchases",
    body: `Some content is available through a paid subscription, rental, or one-time purchase. Prices, availability, and included content may change at any time. Purchases are subject to the refund policy stated at checkout.`,
  },
  {
    title: "4. Acceptable Use",
    body: `You agree not to use Cinema Tube to distribute, copy, or publicly perform any content outside the platform, attempt to circumvent access controls, or use the service for any unlawful purpose.`,
  },
  {
    title: "5. Content & Intellectual Property",
    body: `All movies, shows, images, and related materials available on Cinema Tube are owned by their respective rights holders and are protected by copyright law. Your subscription grants you a limited, non-transferable license to stream content for personal, non-commercial use.`,
  },
  {
    title: "6. User Reviews & Content",
    body: `Reviews and ratings you submit remain yours, but by posting them you grant Cinema Tube a non-exclusive license to display them on the platform. We reserve the right to remove content that violates our community guidelines.`,
  },
  {
    title: "7. Termination",
    body: `We may suspend or terminate your account if you violate these terms. You may cancel your subscription or delete your account at any time from your account settings.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `Cinema Tube is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.`,
  },
  {
    title: "9. Changes to These Terms",
    body: `We may update these Terms & Conditions from time to time. Continued use of Cinema Tube after changes take effect constitutes acceptance of the revised terms.`,
  },
  {
    title: "10. Contact",
    body: `Questions about these terms can be sent through our contact page.`,
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Terms &amp; Conditions
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