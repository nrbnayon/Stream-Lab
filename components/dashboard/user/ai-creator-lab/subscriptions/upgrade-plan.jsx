"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { subscriptionPlans } from "@/constants";
import { Cancel01Icon, Crown03Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PlanCard from "./plan-card";
import { useEffect, useState } from "react";

export default function UpgradePlan() {
  const [paymentMethod, setPaymentMethod] = useState("");
  // TODO: Call API here
  useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button size="responsive">
          <HugeiconsIcon icon={Crown03Icon} />
          Upgrade Plan
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="grid place-items-center h-full overflow-y-auto">
          <div className="w-full max-w-7xl">
            <DrawerHeader>
              <DrawerTitle>Choose Your AI Plan</DrawerTitle>
              <DrawerDescription>
                Unlock unlimited creativity with our AI tools
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subscriptionPlans.map((plan, i) => (
                  <PlanCard
                    plan={plan}
                    key={i}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                  />
                ))}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  size="icon"
                  className="mx-auto my-5 lg:my-10 rounded-full scale-150 bg-destructive/25 hover:bg-destructive/50"
                >
                  <HugeiconsIcon icon={Cancel01Icon} />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
