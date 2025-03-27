import React from 'react';
import { Button } from './Button';

interface BottomPanelProps {
  onDownload?: () => void;
  onShare?: () => void;
  onPlay?: () => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  onDownload,
  onShare,
  onPlay,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-8px_16px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 py-4 flex gap-3">
        <Button
          color="neutral"
          onClick={onDownload}
          className="flex-1 bg-gray-600 hover:bg-gray-600 text-white border-gray-500/30 shadow-[0_2px_1px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_2px_1px_rgba(0,0,0,0.12),0_6px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-[0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_3px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-[17px] h-[17px] mr-2 opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="opacity-90 tracking-wider text-sm font-medium">DOWNLOAD</span>
        </Button>
        
        <Button
          color="neutral"
          onClick={onShare}
          className="flex-1 bg-gray-800 hover:bg-gray-800 text-white border-gray-700/30 shadow-[0_2px_1px_rgba(0,0,0,0.12),0_4px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_2px_1px_rgba(0,0,0,0.15),0_6px_10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-[0_1px_1px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-[17px] h-[17px] mr-2 opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="opacity-90 tracking-wider text-sm font-medium">SHARE</span>
        </Button>
        
        <Button
          color="primary"
          onClick={onPlay}
          className="flex-1 shadow-[0_2px_1px_rgba(249,75,6,0.2),0_4px_6px_rgba(249,75,6,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_2px_1px_rgba(249,75,6,0.25),0_6px_10px_rgba(249,75,6,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[0_1px_1px_rgba(249,75,6,0.2),inset_0_1px_3px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-[17px] h-[17px] mr-2 opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="currentColor"/>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="opacity-90 tracking-wider text-sm font-medium">PLAY</span>
        </Button>
      </div>
    </div>
  );
}; 