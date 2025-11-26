'use client'

import { useEffect, useRef } from 'react';
import { IPlatform } from '@/platforms/IPlatform';
import { CommentData } from '@/types/Platform';
import { Language } from '@/types/Language';

interface CommentPreviewProps {
  platform: IPlatform;
  data: CommentData;
  language: Language;
}

export function CommentPreview({ platform, data, language }: CommentPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      platform.renderComment(canvas, data, language).catch(console.error);
    }
  }, [platform, data, language]);

  const platformName = platform.getName().toLowerCase();

  return (
    <div className="comment-preview">
      <div className="phone-mockup">
        <div className="phone-notch"></div>
        <div className={`phone-screen ${platformName}`}>
          {/* Fake Video Background */}
          <div className="reels-video-bg" />
          
          {/* Reels Overlay UI */}
          <div className="reels-overlay">
            <div className="reels-right-actions">
              <div className="action-item">
                <div className="action-icon">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="#333" stroke="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                   </svg>
                </div>
                <span className="action-text">1.2M</span>
              </div>
              <div className="action-item">
                <div className="action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#333" stroke="none">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                  </svg>
                </div>
                <span className="action-text">8.5K</span>
              </div>
              <div className="action-item">
                <div className="action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#333" stroke="none">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                </div>
                <span className="action-text">Share</span>
              </div>
            </div>

            <div className="reels-bottom-info">
              <div className="reels-username">@{data.username || 'username'}</div>
              <div className="reels-caption">Check out this amazing content! #viral #trending</div>
            </div>
          </div>

      <canvas ref={canvasRef} className="preview-canvas" />
        </div>
      </div>
    </div>
  );
}
