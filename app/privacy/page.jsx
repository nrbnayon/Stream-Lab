export const metadata = {
  title: "Privacy Policy | JusB.io",
  description: "JusB.io Privacy Policy - Learn how we collect, use, protect, and manage your personal information on our platform. Your privacy matters to us.",
  openGraph: {
    title: "Privacy Policy | JusB.io",
    description: "Understanding how JusB.io protects your privacy and handles your personal data.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            JusB.io
          </a>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Effective Date: January 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section className="bg-secondary/50 p-6 rounded-lg border">
            <p className="text-base leading-relaxed">
              At <strong>JusB.io</strong> ("JusB," "we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-base leading-relaxed mt-4">
              <strong>By using JusB.io, you consent to the practices described in this Privacy Policy.</strong>
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
            
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">1.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, password, and profile details</li>
                  <li><strong>Payment Information:</strong> Billing details, payment method information (processed securely through third-party payment processors)</li>
                  <li><strong>Content:</strong> Films, videos, descriptions, and metadata you upload</li>
                  <li><strong>Communications:</strong> Messages, support requests, and feedback you send to us</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">1.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on platform</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience</li>
                  <li><strong>Analytics:</strong> Performance metrics, error logs, and usage patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">1.3 Information from Third Parties</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Social media platforms (if you choose to connect them)</li>
                  <li>Analytics providers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
            <p className="text-base leading-relaxed mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>Enable social distribution features and track referrals</li>
              <li>Calculate and distribute revenue shares</li>
              <li>Communicate with you about your account, updates, and promotional offers</li>
              <li>Detect, prevent, and address fraud, security issues, and technical problems</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">3. How We Share Your Information</h2>
            <p className="text-base leading-relaxed mb-3">We may share your information with:</p>
            
            <div className="ml-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg">Service Providers</h4>
                <p className="text-base">Third-party vendors who help us operate our platform (payment processors, hosting providers, analytics services)</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Content Partners</h4>
                <p className="text-base">When you purchase or rent content, we share necessary information with rights holders for revenue distribution</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Legal Requirements</h4>
                <p className="text-base">When required by law, court order, or government request</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Business Transfers</h4>
                <p className="text-base">In connection with a merger, acquisition, or sale of assets</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">With Your Consent</h4>
                <p className="text-base">When you explicitly authorize us to share your information</p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
              <p className="text-base leading-relaxed font-semibold">
                We do NOT sell your personal information to third parties for their marketing purposes.
              </p>
            </div>
          </section>

          {/* 4. ReelBux and Financial Data */}
          <section className="bg-secondary/50 p-6 rounded-lg border">
            <h2 className="text-3xl font-bold mb-4 text-foreground">4. ReelBux and Financial Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>ReelBux wallet balances and transaction history are stored securely</li>
              <li>Payment card information is processed by PCI-compliant third-party processors (Stripe, PayPal)</li>
              <li>We retain transaction records for accounting, tax, and legal compliance purposes</li>
              <li>Payout information (bank details, PayPal accounts) is encrypted and stored securely</li>
            </ul>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">5. Data Security</h2>
            <p className="text-base leading-relaxed mb-3">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and monitoring</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-base leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* 6. Your Rights and Choices */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">6. Your Rights and Choices</h2>
            <p className="text-base leading-relaxed mb-3">You have the right to:</p>
            
            <div className="ml-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg">Access Your Data</h4>
                <p className="text-base">Request a copy of the personal information we hold about you</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Correct Your Data</h4>
                <p className="text-base">Update or correct inaccurate information through your account settings</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Delete Your Data</h4>
                <p className="text-base">Request deletion of your account and associated data (subject to legal retention requirements)</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Opt-Out of Marketing</h4>
                <p className="text-base">Unsubscribe from promotional emails via the link in each message</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Cookie Preferences</h4>
                <p className="text-base">Manage cookie settings through your browser</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Data Portability</h4>
                <p className="text-base">Request your data in a portable format</p>
              </div>
            </div>

            <p className="text-base leading-relaxed mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@jusb.io" className="text-primary hover:underline font-semibold">privacy@jusb.io</a>
            </p>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">7. Data Retention</h2>
            <p className="text-base leading-relaxed">
              We retain your information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain accurate financial records</li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              When you delete your account, we will delete or anonymize your personal information, except where retention is required by law.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section className="bg-destructive/5 p-6 rounded-lg border border-destructive/20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">8. Children's Privacy</h2>
            <p className="text-base leading-relaxed">
              JusB.io is not intended for users under 18 years of age. We do not knowingly collect personal information from children.
            </p>
            <p className="text-base leading-relaxed mt-3">
              If we discover that we have collected information from a child under 18, we will delete it immediately.
            </p>
          </section>

          {/* 9. International Data Transfers */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">9. International Data Transfers</h2>
            <p className="text-base leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          {/* 10. Third-Party Links */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">10. Third-Party Links</h2>
            <p className="text-base leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices. We encourage you to review their privacy policies.
            </p>
          </section>

          {/* 11. Changes to This Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">11. Changes to This Privacy Policy</h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Posting the updated policy on our platform</li>
              <li>Updating the "Effective Date" at the top</li>
              <li>Sending you an email notification (for material changes)</li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              Your continued use of JusB.io after changes take effect constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">12. Contact Us</h2>
            <p className="text-base leading-relaxed mb-3">
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-base">
                <strong>Email:</strong> <a href="mailto:privacy@jusb.io" className="text-primary hover:underline">privacy@jusb.io</a>
              </p>
              <p className="text-base">
                <strong>Support:</strong> <a href="mailto:support@jusb.io" className="text-primary hover:underline">support@jusb.io</a>
              </p>
            </div>
          </section>

          {/* Footer Tagline */}
          <div className="text-center py-8 border-t mt-12">
            <p className="text-2xl font-bold text-primary">
              No Algorithms. Just People.
            </p>
            <p className="text-muted-foreground mt-2">
              Your privacy matters to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
