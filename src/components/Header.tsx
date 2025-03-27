import React from 'react';
import { CodeIcon, ArrowRightIcon } from './Icons';
import Switch from './Switch';

interface HeaderProps {
  devMode: boolean;
  setDevMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ devMode, setDevMode }) => {
  return (
    <header className="flex w-full max-w-[1080px] mx-auto mb-8 px-8 pt-6">
      <div className="grid grid-cols-12 gap-x-4">
        {/* Logo */}
        <div className="col-span-2 order-1 mb-4 md:mb-0">
          <div className="relative text-xl font-bold text-[#1A1A1A]">
            OpenAI.fm
          </div>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-7 xl:col-span-7 order-3 md:order-2">
          <div className="text-balance">
            <div className="text-[#666666] mb-2.5">
              An interactive demo for developers to try the new text-to-speech model in the OpenAI API.
            </div>
            <a
              className="uppercase text-[#1A1A1A] hover:text-[#666666] transition-colors inline-block text-sm font-medium"
              href="https://platform.openai.com/docs/guides/audio"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex items-center gap-x-1">
                Start building
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

        {/* Switch */}
        <div className="col-span-10 md:col-span-3 xl:col-span-3 flex justify-end items-start order-2 md:order-3">
          <div className="relative">
            <Switch
              checked={devMode}
              onChange={() => setDevMode(!devMode)}
              id="dev-mode"
              label={<CodeIcon className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
