"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Delete02Icon,
  PencilEdit02Icon,
  PlusSignCircleIcon,
  ShieldUserIcon,
  TickDouble01Icon,
} from "@hugeicons/core-free-icons/index";
import SettingsCard from "../../settings-card";
import { useState } from "react";
import { termsAndConditions } from "@/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import TermsActionDialog from "./terms-action-dialog";

export default function AdminTermsAndConditionsDialog() {
  const [termsConditions, setTermsConditions] = useState(termsAndConditions);
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <SettingsCard
          title="Terms & Conditions"
          description="Edit and Delete Terms & Conditions"
          icon={ShieldUserIcon}
        />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex-row gap-3 items-center flex-wrap">
          {/* Add New Terms */}
          <TermsActionDialog
            actionFor="add"
            triggerBtn={
              <Button variant="secondary" className="md:h-full aspect-square">
                <HugeiconsIcon icon={PlusSignCircleIcon} />
              </Button>
            }
          />
          <div className="space-y-1">
            <DialogTitle>JusB.io Terms & Conditions</DialogTitle>
            <DialogDescription>
              Edit, delete or add new term and condition.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-2">
          {termsConditions.map((terms) => (
            <div key={terms.id}>
              <h3 className="text-lg font-medium flex justify-between gap-5 items-end">
                <span>
                  {terms.id}. {terms.title}
                </span>

                <span className="flex gap-1">
                  {/* Edit */}
                  <TermsActionDialog
                    actionFor="edit"
                    data={terms}
                    triggerBtn={
                      <HugeiconsIcon
                        icon={PencilEdit02Icon}
                        className="text-secondary-foreground cursor-pointer"
                      />
                    }
                  />

                  {/* delete */}
                  <TermsActionDialog
                    actionFor="delete"
                    data={terms}
                    triggerBtn={
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        className="text-destructive cursor-pointer"
                      />
                    }
                  />
                </span>
              </h3>
              <ul>
                {terms.details.map((detail, i) => (
                  <li key={i} className="text-secondary-foreground">
                    — {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
