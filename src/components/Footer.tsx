import React from 'react';
import { Button } from './Button';
import { DownloadIcon, ShareIcon, PlayIcon, PauseIcon } from './Icons';

interface FooterProps {
  onPlay: (vibe: string, script: string) => void;
  onDownload: () => void;
  onShare: () => void;
  isLoading: boolean;
  isPlaying?: boolean;
  selectedVibe: string;
  script: string;
}

const Footer: React.FC<FooterProps> = ({
  onPlay,
  onDownload,
  onShare,
  isLoading,
  isPlaying = false,
  selectedVibe,
  script
}) => {
  return (
    <footer className="py-4 px-8 sticky bottom-0 z-10 bg-white border-t border-gray-100">
      <div className="relative w-full max-w-[1080px] m-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <Button
            color="tertiary"
            onClick={onDownload}
            className="py-3"
          >
            <DownloadIcon className="w-5 h-5" />
            <span className="uppercase hidden md:inline pl-2 text-sm font-medium">DOWNLOAD</span>
          </Button>

          <Button
            color="secondary"
            onClick={onShare}
            className="py-3"
          >
            <span className="flex gap-2 items-center justify-center">
              <ShareIcon className="w-5 h-5" />
              <span className="uppercase hidden md:inline text-sm font-medium">SHARE</span>
            </span>
          </Button>

          <div className="flex col-span-1 sm:col-span-2">
            <Button
              color="primary"
              className={`relative w-full py-3 overflow-hidden ${isLoading ? 'cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && onPlay(selectedVibe, script)}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isPlaying ? (
                  <>
                    <PauseIcon className="w-5 h-5" />
                    <span className="uppercase hidden md:inline text-sm font-medium">STOP</span>
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5" />
                    <span className="uppercase hidden md:inline text-sm font-medium">
                      {isLoading ? 'BUSY' : 'PLAY'}
                    </span>
                  </>
                )}
              </div>
              {/* Loading animation */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/5">
                  <div className="absolute inset-0 animate-loading-gradient bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              )}
              {/* Playing animation */}
              {isPlaying && !isLoading && (
                <div className="absolute inset-0 bg-black/5">
                  <div className="absolute inset-0 animate-pulse bg-white/5" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
