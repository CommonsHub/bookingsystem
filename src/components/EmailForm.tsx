
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserEmail } from "@/utils/emailVerification";

interface EmailFormProps {
  onSubmit: (email: string) => void;
  buttonText: string;
}

export function EmailForm({ onSubmit, buttonText }: EmailFormProps) {
  const [email, setEmail] = useState(getUserEmail() || "");
  const [isValid, setIsValid] = useState(!!email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <Button type="submit" disabled={!isValid} className="w-full">
        {buttonText}
      </Button>
    </form>
  );
}
