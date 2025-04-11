
import { useState } from "react";
import { Comment, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";

interface CommentThreadProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
}

export function CommentThread({ comments, currentUser, onAddComment }: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Comments</h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>
                {comment.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-secondary rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-6">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

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
    </div>
  );
}
