// components/dashboard/admin/payment/withdrawal-action-dialog.jsx
"use client";
import { useApproveOrRejectWithdrawalMutation } from "@/redux/store/api/adminApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function WithdrawalActionDialog({
  isOpen,
  onClose,
  withdrawal,
  action, // "approved" or "rejected"
}) {
  const [approveOrRejectWithdrawal, { isLoading }] = useApproveOrRejectWithdrawalMutation();

  const handleConfirm = async () => {
    try {
      const result = await approveOrRejectWithdrawal({
        id: withdrawal.id,
        status: action,
      }).unwrap();

      toast.success(
        action === "approved"
          ? `Withdrawal approved successfully!`
          : "Withdrawal rejected successfully!"
      );
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${action} withdrawal`);
    }
  };

  if (!withdrawal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "approved" ? "Approve" : "Reject"} Withdrawal Request
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {action === "approved" ? "approve" : "reject"} this withdrawal request?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="bg-secondary p-3 rounded-md space-y-2">
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Name:</span>
              <span className="font-medium">{withdrawal?.user_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Email:</span>
              <span className="font-medium">{withdrawal?.user_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Previous Balance:</span>
              <span className="font-medium">
                ${Number(withdrawal?.previous_balance).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdrawal Amount:</span>
              <span className="font-medium text-green-500">
                ${Number(withdrawal?.withdraw_amount).toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Balance:</span>
              <span className="font-medium">
                ${Number(withdrawal?.current_balance).toFixed(2)}
              </span>
            </div>
          </div>

          {action === "approved" && (
            <p className="text-sm text-muted-foreground">
              ⚠️ Approving this request will initiate a payout to the user's account.
            </p>
          )}
          {action === "rejected" && (
            <p className="text-sm text-muted-foreground">
              ⚠️ Rejecting this request will deny the withdrawal and the user will need to request again.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={action === "approved" ? "default" : "destructive"}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Confirm ${action === "approved" ? "Approval" : "Rejection"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
