
import { useState } from "react";
import { Comment, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";
import { EmailForm } from "./EmailForm";
import { VerificationNotice } from "./VerificationNotice";
import { 
  getUserEmail, 
  isUserVerified, 
  storeVerificationItem 
} from "@/utils/emailVerification";

interface CommentThreadProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string, isDraft?: boolean) => void;
}

export function CommentThread({ comments, currentUser, onAddComment }: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [pendingContent, setPendingContent] = useState("");
  const [submittingEmail, setSubmittingEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isUserVerified() && !getUserEmail()) {
      setPendingContent(newComment);
      setShowEmailForm(true);
      return;
    }

    if (!isUserVerified() && getUserEmail()) {
      setPendingContent(newComment);
      const code = storeVerificationItem(
        getUserEmail()!, 
        'comment', 
        'pending' // Temporary ID until comment is created
      );
      setVerificationCode(code);
      setShowEmailForm(false);
      return;
    }

    // User is verified, proceed normally
    onAddComment(newComment);
    setNewComment("");
  };

  const handleEmailSubmit = (email: string) => {
    setSubmittingEmail(email);
    setShowEmailForm(false);
    const code = storeVerificationItem(email, 'comment', 'pending'); // ID is temporary until comment is created
    setVerificationCode(code);
  };

  const handleVerified = () => {
    onAddComment(pendingContent); 
    setNewComment("");
    setVerificationCode(null);
    setPendingContent("");
  };

  const visibleComments = comments.filter(
    comment => !comment.isDraft || comment.user.id === currentUser.id
  );

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Comments</h3>
      
      <div className="space-y-4">
        {visibleComments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>
                {comment.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className={`rounded-lg p-3 ${comment.isDraft ? 'bg-secondary/50 border border-dashed border-muted-foreground' : 'bg-secondary'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{comment.user.name}</span>
                    {comment.isDraft && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {visibleComments.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-6">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {showEmailForm ? (
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Verify Your Email</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Please provide your email address to submit your comment.
          </p>
          <EmailForm 
            onSubmit={handleEmailSubmit}
            buttonText="Continue with Comment"
          />
        </div>
      ) : verificationCode ? (
        <VerificationNotice 
          email={submittingEmail || getUserEmail() || ''} 
          verificationCode={verificationCode}
          onVerified={handleVerified}
        />
      ) : (
        <form onSubmit={handleSubmit} className="pt-2">
          <div className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>
                {currentUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea 
                placeholder="Add a comment..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
