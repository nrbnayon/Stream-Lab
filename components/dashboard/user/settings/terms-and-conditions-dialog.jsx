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

export default function TermsAndConditionsDialog() {
  const { data: termsResponse, isLoading } = useGetUserTermsQuery();
  const termsAndConditions = termsResponse?.data || [];

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
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-2">
          {isLoading ? (
            <p>Loading terms and conditions...</p>
          ) : termsAndConditions.length === 0 ? (
            <p>No terms and conditions available.</p>
          ) : (
            termsAndConditions.map((terms) => (
              <div key={terms.id}>
                <h3 className="text-lg font-medium">
                  {terms.id}. {terms.title}
                </h3>
                <ul>
                  {terms.details.map((detail, i) => (
                    <li key={i} className="text-secondary-foreground">
                      — {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
