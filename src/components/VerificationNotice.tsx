
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { completeVerification } from "@/utils/emailVerification";
import { toast } from "sonner";

interface VerificationNoticeProps {
  email: string;
  verificationCode: string;
  onVerified: () => void;
}

export function VerificationNotice({ 
  email, 
  verificationCode,
  onVerified 
}: VerificationNoticeProps) {
  const handleVerify = () => {
    completeVerification(email);
    onVerified();
    toast.success("Email verified successfully!");
  };

  return (
    <Alert className="my-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Verification Required</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          An email has been sent to <strong>{email}</strong> with a verification link. 
          Please check your inbox and click the link to verify your email.
        </p>
        <p className="text-sm text-muted-foreground">
          Your submission will remain in draft mode until verification is complete.
        </p>
        
        {/* This simulates clicking an email verification link */}
        <div className="bg-muted p-3 rounded-md border border-dashed border-muted-foreground text-xs">
          <p className="font-mono">Verification Link (Simulation for demo purposes):</p>
          <div className="flex items-center justify-between mt-2 bg-background p-2 rounded">
            <code className="text-xs truncate">
              https://example.com/verify?code={verificationCode}&email={email}
            </code>
            <Button 
              size="sm" 
              variant="secondary" 
              className="ml-2 shrink-0"
              onClick={handleVerify}
            >
              Verify
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
