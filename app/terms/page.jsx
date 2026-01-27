export const metadata = {
  title: "Terms and Conditions | JusB.io",
  description: "Read JusB.io's Terms and Conditions. Learn about our pay-per-view film marketplace, social distribution platform, user roles, revenue sharing, and platform policies.",
  openGraph: {
    title: "Terms and Conditions | JusB.io",
    description: "JusB.io Terms and Conditions - Understanding our pay-per-view film marketplace and social distribution platform.",
    type: "website",
  },
};

export default function TermsPage() {
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
            JusB.io Terms and Conditions
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
              Welcome to <strong>JusB.io</strong> ("JusB," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of the JusB.io platform, including all websites, applications, tools, digital wallets, distribution features, and services offered by JusB (collectively, the "Platform").
            </p>
            <p className="text-base leading-relaxed mt-4">
              <strong>By accessing or using JusB.io in any manner, you agree to be bound by these Terms. If you do not agree, do not use the Platform.</strong>
            </p>
          </section>

          {/* 1. Platform Overview */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">1. Platform Overview</h2>
            <p className="text-base leading-relaxed">
              JusB.io is a <strong>pay-per-view film and television marketplace</strong> built around <strong>Social Distribution</strong>, allowing creators, rights holders, and approved distributors ("Distros") to share and sell content through unique links and QR codes, with revenue participation based on defined rules.
            </p>
            <p className="text-base leading-relaxed mt-3">
              <strong>JusB is NOT a traditional streaming service, subscription platform, or ad-based distributor.</strong>
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">2. Eligibility</h2>
            <p className="text-base leading-relaxed">
              You must be at least <strong>18 years old</strong> (or the age of majority in your jurisdiction) to use JusB.io.
            </p>
            <p className="text-base leading-relaxed mt-3">
              By using the Platform, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You have the legal capacity to enter into these Terms.</li>
              <li>All information you provide is accurate and current.</li>
            </ul>
          </section>

          {/* 3. Account Registration */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">3. Account Registration</h2>
            <p className="text-base leading-relaxed">
              To access certain features, you may be required to create an account.
            </p>
            <p className="text-base leading-relaxed mt-3">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activity occurring under your account</li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              JusB reserves the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          {/* 4. Roles on JusB */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">4. Roles on JusB</h2>
            
            {/* 4.1 Viewers */}
            <div className="ml-4 mt-4">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">4.1 Viewers</h3>
              <p className="text-base leading-relaxed">
                Viewers may watch content, make purchases, leave tips (where applicable), and share content.
              </p>
              <p className="text-base leading-relaxed mt-2">
                <strong>Purchases are final unless otherwise required by law.</strong>
              </p>
            </div>

            {/* 4.2 Distros */}
            <div className="ml-4 mt-6 bg-primary/5 p-5 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">4.2 Distros (Social Distributors)</h3>
              <p className="text-base leading-relaxed">
                A <strong>Distro</strong> is a user who shares a JusB title using a unique link or QR code and may earn a percentage of qualifying purchases driven by that share.
              </p>
              <p className="text-base leading-relaxed mt-3">
                By acting as a Distro, you agree:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>To share content ethically and lawfully</li>
                <li>Not to engage in spam, deception, coercion, or misleading practices</li>
                <li>Not to associate JusB or any title with harmful, illegal, hateful, or exploitative activity</li>
              </ul>
              
              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md mt-4">
                <h4 className="font-bold text-destructive mb-2">Strict Prohibition:</h4>
                <p className="text-base leading-relaxed mb-2">
                  Distros may NOT promote content alongside or in connection with:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Violence, terrorism, or extremist activity</li>
                  <li>Hate speech, harassment, or discrimination</li>
                  <li>Sexual exploitation, abuse, or trafficking</li>
                  <li>Fraud, scams, or false claims</li>
                  <li>Dangerous or illegal acts</li>
                </ul>
              </div>

              <p className="text-base leading-relaxed mt-4 font-semibold">
                JusB may revoke Distro privileges, withhold earnings, or terminate accounts at its sole discretion for violations.
              </p>
            </div>

            {/* 4.3 Uploaders */}
            <div className="ml-4 mt-6">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">4.3 Uploaders / Rights Holders</h3>
              <p className="text-base leading-relaxed">
                Uploaders (including filmmakers, producers, distributors, or rights holders) are users who submit content to JusB.
              </p>
              <p className="text-base leading-relaxed mt-3">
                By uploading or delivering a title, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>You own or control all necessary rights</li>
                <li>The content does not infringe any third-party rights</li>
                <li>The content complies with all applicable laws</li>
              </ul>
              <p className="text-base leading-relaxed mt-3 font-semibold">
                JusB does NOT accept responsibility for disputes over ownership, credits, or revenue splits between collaborators.
              </p>
            </div>
          </section>

          {/* 5. Content Submission & Approval */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">5. Content Submission & Approval</h2>
            <p className="text-base leading-relaxed">
              All titles submitted to JusB are subject to <strong>review and approval</strong>.
            </p>
            <p className="text-base leading-relaxed mt-3">
              JusB reserves the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Accept or reject any submission for any reason</li>
              <li>Remove content at any time</li>
              <li>Request additional documentation proving ownership or rights</li>
            </ul>
            <p className="text-base leading-relaxed mt-3 font-semibold">
              Uploading content does NOT guarantee distribution, promotion, or revenue.
            </p>
          </section>

          {/* 6. Revenue, Payments & ReelBux */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">6. Revenue, Payments & ReelBux</h2>
            
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">6.1 Revenue Splits</h3>
                <p className="text-base leading-relaxed">
                  Revenue splits vary depending on the distribution method, role of the user, and specific deal terms presented at the time of sale.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  JusB may update revenue structures periodically.
                </p>
              </div>

              <div className="bg-secondary/50 p-5 rounded-lg border">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">6.2 ReelBux Wallet</h3>
                <p className="text-base leading-relaxed">
                  ReelBux is a <strong>stored-value digital wallet</strong> within JusB.
                </p>
                <p className="text-base leading-relaxed mt-3">Key rules:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>ReelBux balances have no cash value once converted</li>
                  <li>ReelBux may only be spent on JusB products and services</li>
                  <li>Transfers into ReelBux are irreversible</li>
                </ul>
                <p className="text-base leading-relaxed mt-3 font-semibold">
                  JusB is not a bank and ReelBux is not a cryptocurrency.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">6.3 Payouts</h3>
                <p className="text-base leading-relaxed">
                  Where applicable, cash payouts:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Are processed without minimum payout thresholds</li>
                  <li>May require identity verification</li>
                  <li>Are subject to processing fees</li>
                </ul>
                <p className="text-base leading-relaxed mt-3">
                  JusB may delay or withhold payouts in cases of suspected fraud, abuse, or policy violations.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Tips & Voluntary Support */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">7. Tips & Voluntary Support</h2>
            <p className="text-base leading-relaxed">
              Some content may include optional tipping or support features.
            </p>
            <p className="text-base leading-relaxed mt-3">Tips are:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Voluntary</li>
              <li>Non-refundable</li>
              <li>Not donations to a registered charity unless explicitly stated</li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              Creators are responsible for reporting and paying any applicable taxes.
            </p>
          </section>

          {/* 8. Prohibited Content & Conduct */}
          <section className="bg-destructive/5 p-6 rounded-lg border border-destructive/20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">8. Prohibited Content & Conduct</h2>
            <p className="text-base leading-relaxed mb-3">You may NOT:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload illegal, harmful, or infringing content</li>
              <li>Impersonate others</li>
              <li>Manipulate metrics or earnings</li>
              <li>Circumvent platform safeguards</li>
              <li>Use JusB for unlawful or abusive purposes</li>
            </ul>
            <p className="text-base leading-relaxed mt-4 font-bold text-destructive">
              JusB maintains ZERO TOLERANCE for harmful behavior.
            </p>
          </section>

          {/* 9. Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">9. Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              All JusB trademarks, branding, software, and platform technology remain the exclusive property of JusB.
            </p>
            <p className="text-base leading-relaxed mt-3">
              You may not copy, modify, or exploit JusB IP without written permission.
            </p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">10. Termination</h2>
            <p className="text-base leading-relaxed">
              JusB may suspend or terminate access to the Platform:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With or without notice</li>
              <li>For violations of these Terms</li>
              <li>To protect users, content, or the platform</li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              Termination does not eliminate outstanding obligations.
            </p>
          </section>

          {/* 11. Disclaimers */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">11. Disclaimers</h2>
            <p className="text-base leading-relaxed">
              JusB is provided "as-is" and "as available."
            </p>
            <p className="text-base leading-relaxed mt-3">
              We make no guarantees regarding:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Earnings</li>
              <li>Discoverability</li>
              <li>Distribution success</li>
            </ul>
          </section>

          {/* 12. Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">12. Limitation of Liability</h2>
            <p className="text-base leading-relaxed">
              To the maximum extent permitted by law, JusB shall not be liable for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Lost profits or revenue</li>
              <li>Content disputes</li>
              <li>Third-party actions</li>
            </ul>
          </section>

          {/* 13. Indemnification */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">13. Indemnification</h2>
            <p className="text-base leading-relaxed">
              You agree to indemnify and hold harmless JusB from claims arising out of:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Your use of the Platform</li>
              <li>Your content</li>
              <li>Your violation of these Terms</li>
            </ul>
          </section>

          {/* 14. Governing Law */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">14. Governing Law</h2>
            <p className="text-base leading-relaxed">
              These Terms are governed by the laws of the <strong>State of Delaware</strong>, without regard to conflict of law principles.
            </p>
          </section>

          {/* 15. Changes to Terms */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">15. Changes to Terms</h2>
            <p className="text-base leading-relaxed">
              JusB may update these Terms at any time.
            </p>
            <p className="text-base leading-relaxed mt-3">
              Continued use of the Platform constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 16. Contact */}
          <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">16. Contact</h2>
            <p className="text-base leading-relaxed">
              Questions regarding these Terms may be sent to:
            </p>
            <p className="text-lg font-semibold mt-3">
              <a href="mailto:support@jusb.io" className="text-primary hover:underline">
                support@jusb.io
              </a>
            </p>
          </section>

          {/* Footer Tagline */}
          <div className="text-center py-8 border-t mt-12">
            <p className="text-2xl font-bold text-primary">
              No Algorithms. Just People.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
