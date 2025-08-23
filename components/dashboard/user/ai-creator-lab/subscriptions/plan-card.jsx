import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tick01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
export default function PlanCard({ plan, setPaymentMethod, paymentMethod }) {
  const { isHighlighted, icon, name, price, features } = plan;
  return (
    <Card
      className={`${
        isHighlighted ? "border-primary mt-3 md:mt-0 pt-7" : ""
      } relative`}
    >
      {isHighlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-md h-8 px-3 flex items-center ">
          Most Popular
        </span>
      )}
      <CardHeader>
        <CardDescription className="flex gap-3 justify-center items-center">
          <span>{icon}</span>
          <span>{name}</span>
        </CardDescription>
        <CardTitle className="text-center">
          ${price}
          <span className="text-secondary-foreground">/month</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, i) => (
          <p key={i} className="flex gap-3">
            <HugeiconsIcon icon={Tick01Icon} className="text-green-500" />
            <span>{feature}</span>
          </p>
        ))}

        {/* Choosing payment method */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full mt-3"
              variant={isHighlighted ? "default" : "secondary"}
            >
              Choose {name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Choose Payment Method</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={paymentMethod === "card"}
              onCheckedChange={() => setPaymentMethod("card")}
            >
              Credit Card
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={paymentMethod === "wallet"}
              onCheckedChange={() => setPaymentMethod("wallet")}
            >
              Wallet Balance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={paymentMethod == "paypal"}
              onCheckedChange={() => setPaymentMethod("paypal")}
            >
              PayPal
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
