import { CommentData, PlatformConfig } from '@/types/Platform';
import { Language } from '@/types/Language';

export interface IPlatform {
  getName(): string;
  getConfig(): PlatformConfig;
  renderComment(canvas: HTMLCanvasElement, data: CommentData, language?: Language): Promise<void>;
}

