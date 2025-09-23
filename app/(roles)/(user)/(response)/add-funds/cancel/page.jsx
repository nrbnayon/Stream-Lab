// app\(roles)\(user)\(response)\add-funds\cancel\page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { XCircleIcon } from "lucide-react";

export default function AddFundCancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.info("Add Fund cancelled. You can try again anytime.");
  }, []);

  const handleRetryAddFund = () => {
    router.back();
  };

  const handleGoToWatch = () => {
    router.push("/watch");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircleIcon className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Add Fund Cancelled
          </CardTitle>
          <CardDescription>
            Your Add Fund was cancelled. No charges were made to your account.
            You can try again anytime.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={handleRetryAddFund} className="w-full">
            Try Add Fund Again
          </Button>
          <Button
            onClick={handleGoToWatch}
            variant="outline"
            className="w-full"
          >
            Continue Browsing
          </Button>
          <Button onClick={handleGoHome} variant="ghost" className="w-full">
            Go to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}