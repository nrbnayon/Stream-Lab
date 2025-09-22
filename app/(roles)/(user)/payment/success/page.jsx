"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircleIcon } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    // Verify the status parameter
    if (status === 'success') {
      toast.success("Payment successful! Redirecting to your library...");
      
      // Redirect to library after 3 seconds
      const timeout = setTimeout(() => {
        router.push("/my-library");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [router, status]);

  const handleGoToLibrary = () => {
    router.push("/my-library");
  };

  const handleGoToWatch = () => {
    router.push("/watch");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Your payment has been processed successfully. You now have access to your purchased content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            You will be automatically redirected to your library in a few seconds...
          </div>
          <div className="space-y-2">
            <Button onClick={handleGoToLibrary} className="w-full">
              Go to My Library
            </Button>
            <Button onClick={handleGoToWatch} variant="outline" className="w-full">
              Continue Browsing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}