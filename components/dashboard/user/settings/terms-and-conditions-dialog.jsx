// components/dashboard/user/settings/terms-and-conditions-dialog.js
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldUserIcon } from "@hugeicons/core-free-icons/index";
import SettingsCard from "../../settings-card";
import { useGetUserTermsQuery } from "@/redux/store/api/usersApi";

// Default Terms and Conditions
const DEFAULT_TERMS_AND_CONDITIONS = [
  {
    id: 1,
    title: "Platform Overview",
    details: [
      "JusB.io is a pay-per-view film and television marketplace built around Social Distribution",
      "Allow creators, rights holders, and approved distributors to share and sell content through unique links and QR codes",
      "Revenue participation is based on defined rules",
      "JusB is NOT a traditional streaming service, subscription platform, or ad-based distributor",
    ],
  },
  {
    id: 2,
    title: "Eligibility",
    details: [
      "You must be at least 18 years old (or the age of majority in your jurisdiction) to use JusB.io",
      "You have the legal capacity to enter into these Terms",
      "All information you provide is accurate and current",
    ],
  },
  {
    id: 3,
    title: "Account Registration",
    details: [
      "You are responsible for maintaining the confidentiality of your login credentials",
      "You are responsible for all activity occurring under your account",
      "JusB reserves the right to suspend or terminate accounts that violate these Terms",
    ],
  },
  {
    id: 4,
    title: "Roles on JusB",
    details: [
      "Viewers may watch content, make purchases, leave tips (where applicable), and share content",
      "Distros share JusB titles using unique links or QR codes and may earn a percentage of qualifying purchases",
      "Distros must share content ethically and lawfully without spam, deception, coercion, or misleading practices",
      "Uploaders (filmmakers, producers, distributors, rights holders) submit content to JusB and warrant they own all necessary rights",
      "All submissions are subject to review and approval by JusB",
    ],
  },
  {
    id: 5,
    title: "Content Submission & Approval",
    details: [
      "All titles submitted to JusB are subject to review and approval",
      "JusB reserves the right to accept or reject any submission for any reason",
      "JusB reserves the right to remove content at any time",
      "JusB may request additional documentation proving ownership or rights",
      "Uploading content does NOT guarantee distribution, promotion, or revenue",
    ],
  },
  {
    id: 6,
    title: "Revenue, Payments & ReelBux",
    details: [
      "Revenue splits vary depending on the distribution method, role of the user, and specific deal terms",
      "ReelBux is a stored-value digital wallet within JusB",
      "ReelBux balances have no cash value once converted and may only be spent on JusB products and services",
      "Transfers into ReelBux are irreversible",
      "Cash payouts may require identity verification and are subject to processing fees",
      "JusB may delay or withhold payouts in cases of suspected fraud, abuse, or policy violations",
    ],
  },
  {
    id: 7,
    title: "Tips & Voluntary Support",
    details: [
      "Some content may include optional tipping or support features",
      "Tips are voluntary, non-refundable, and not donations to a registered charity unless explicitly stated",
      "Creators are responsible for reporting and paying any applicable taxes",
    ],
  },
  {
    id: 8,
    title: "Prohibited Content & Conduct",
    details: [
      "Do NOT upload illegal, harmful, or infringing content",
      "Do NOT impersonate others",
      "Do NOT manipulate metrics or earnings",
      "Do NOT circumvent platform safeguards",
      "Do NOT use JusB for unlawful or abusive purposes",
      "JusB maintains ZERO TOLERANCE for harmful behavior",
    ],
  },
  {
    id: 9,
    title: "Intellectual Property",
    details: [
      "All JusB trademarks, branding, software, and platform technology remain the exclusive property of JusB",
      "You may not copy, modify, or exploit JusB IP without written permission",
    ],
  },
  {
    id: 10,
    title: "Termination",
    details: [
      "JusB may suspend or terminate access to the Platform with or without notice",
      "Termination may occur for violations of these Terms or to protect users, content, or the platform",
      "Termination does not eliminate outstanding obligations",
    ],
  },
  {
    id: 11,
    title: "Disclaimers",
    details: [
      "JusB is provided 'as-is' and 'as available'",
      "We make no guarantees regarding earnings, discoverability, or distribution success",
    ],
  },
  {
    id: 12,
    title: "Limitation of Liability",
    details: [
      "To the maximum extent permitted by law, JusB shall not be liable for lost profits or revenue",
      "JusB shall not be liable for content disputes or third-party actions",
    ],
  },
  {
    id: 13,
    title: "Indemnification",
    details: [
      "You agree to indemnify and hold harmless JusB from claims arising out of your use of the Platform",
      "You agree to indemnify JusB from claims arising from your content or violation of these Terms",
    ],
  },
  {
    id: 14,
    title: "Governing Law",
    details: [
      "These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles",
    ],
  },
  {
    id: 15,
    title: "Changes to Terms",
    details: [
      "JusB may update these Terms at any time",
      "Continued use of the Platform constitutes acceptance of the updated Terms",
    ],
  },
  {
    id: 16,
    title: "Contact Information",
    details: [
      "Questions regarding these Terms may be sent to: support@jusb.io",
    ],
  },
];

export default function TermsAndConditionsDialog() {
  const { data: termsResponse, isLoading } = useGetUserTermsQuery();

  // Use API data if available, otherwise use default terms
  const termsAndConditions =
    termsResponse?.data && termsResponse.data.length > 0
      ? termsResponse.data
      : DEFAULT_TERMS_AND_CONDITIONS;

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <SettingsCard
          title="Terms & Conditions"
          description="View our Terms & Conditions"
          icon={ShieldUserIcon}
        />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>JusB.io Terms & Conditions</DialogTitle>
          <DialogDescription>
            Please review the rules and guidelines for distribution, payouts,
            and marketing conduct on JusB.io before continuing.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">
              Loading terms and conditions...
            </p>
          ) : (
            termsAndConditions.map((terms) => (
              <div key={terms.id} className="pb-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {terms.id}. {terms.title}
                </h3>
                <ul className="space-y-1">
                  {terms.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm text-secondary-foreground leading-relaxed"
                    >
                      • {detail}
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-primary font-bold mt-2">
                  No Algorithms. Just People.
                </p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
