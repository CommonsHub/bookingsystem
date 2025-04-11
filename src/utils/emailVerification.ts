
import { VerificationStatus } from "@/types";

// Key used for localStorage
const EMAIL_STORAGE_KEY = 'user_email_verification';

// Get stored verification status
export const getStoredVerification = (): VerificationStatus | null => {
  const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const parsed = JSON.parse(stored);
    
    // Convert date strings back to Date objects
    if (parsed.verifiedAt) {
      parsed.verifiedAt = new Date(parsed.verifiedAt);
    }
    
    return parsed;
  } catch (e) {
    console.error('Failed to parse stored email verification:', e);
    return null;
  }
};

// Store email and pending verification item
export const storeVerificationItem = (
  email: string, 
  itemType: 'booking' | 'comment', 
  itemId: string
): string => {
  const verification = getStoredVerification() || { 
    email, 
    pendingItems: [] 
  };
  
  // Use the same email or update if different
  verification.email = email;
  
  // Add the new pending item
  verification.pendingItems.push({
    type: itemType,
    id: itemId
  });
  
  localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(verification));
  
  // Generate a verification code (in a real app, this would be a secure token)
  const verificationCode = Math.random().toString(36).substring(2, 15);
  return verificationCode;
};

// Mark the verification as complete
export const completeVerification = (email: string): boolean => {
  const verification = getStoredVerification();
  if (!verification || verification.email !== email) return false;
  
  verification.verifiedAt = new Date();
  localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(verification));
  return true;
};

// Check if a specific item is pending verification
export const isItemPendingVerification = (
  itemType: 'booking' | 'comment',
  itemId: string
): boolean => {
  const verification = getStoredVerification();
  if (!verification || verification.verifiedAt) return false;
  
  return verification.pendingItems.some(
    item => item.type === itemType && item.id === itemId
  );
};

// Get current user's email
export const getUserEmail = (): string | null => {
  const verification = getStoredVerification();
  return verification?.email || null;
};

// Check if user is verified
export const isUserVerified = (): boolean => {
  const verification = getStoredVerification();
  return verification?.verifiedAt !== undefined;
};
