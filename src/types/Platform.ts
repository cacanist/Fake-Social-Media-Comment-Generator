export type PlatformType = 'tiktok' | 'instagram' | 'youtube';

export interface CommentData {
  username: string;
  commentText: string;
  profileImage: string | null;
  replyingTo?: string; // Optional: The username being replied to
}

export interface PlatformConfig {
  commentWidth: number;
  commentHeight: number;
  backgroundColor: string;
  textColor: string;
  usernameFontSize: number;
  commentFontSize: number;
  padding: number;
  borderRadius: number;
  verifiedIconSize: number;
  profileImageSize: number;
}

