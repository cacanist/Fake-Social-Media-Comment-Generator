'use client'

import { CommentData } from '@/types/Platform';
import { Language, translations } from '@/types/Language';

interface CommentFormProps {
  data: CommentData;
  onDataChange: (data: Partial<CommentData>) => void;
  language?: Language;
}

export function CommentForm({ data, onDataChange, language = 'en' }: CommentFormProps) {
  const t = translations[language];

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 150);
    onDataChange({ commentText: value });
  };

  const handleReplyingToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ replyingTo: e.target.value });
  };

  return (
    <div className="comment-form">
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder={t.replyingToPlaceholder}
          value={data.replyingTo || ''}
          onChange={handleReplyingToChange}
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder={t.commentTextPlaceholder}
          value={data.commentText}
          onChange={handleCommentChange}
          rows={4}
        />
        <div className="char-count">{data.commentText.length}{t.characterCount}</div>
      </div>
    </div>
  );
}

