// hooks/usePaymentUtils.js
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePaymentUtils = () => {
  const router = useRouter();

  const handlePaymentRedirect = (url) => {
    if (url) {
      // For external redirects (Stripe/PayPal checkout)
      window.location.href = url;
    }
  };

  const handlePaymentSuccess = (message, redirectTo = "/my-library") => {
    toast.success(message || "Payment successful!");
    router.push(redirectTo);
  };

  const handlePaymentError = (error) => {
    const errorMessage =
      error?.data?.message ||
      error?.message ||
      "Payment failed. Please try again.";
    console.error("Payment error:", error);
    toast.error(errorMessage);
  };

  const handlePaymentCancel = () => {
    toast.info("Payment cancelled");
    router.push("/watch");
  };

  const calculateRentPrice = (basePrice, hours) => {
    const maxHours = 72; // Maximum rent hours as per API
    const hourlyRate = basePrice / maxHours;
    return (hourlyRate * hours).toFixed(2);
  };

  return {
    handlePaymentRedirect,
    handlePaymentSuccess,
    handlePaymentError,
    handlePaymentCancel,
    calculateRentPrice,
  };
};
