import React from 'react';
import { VoiceButton , Button } from './Button';
import { ShuffleIcon } from './Icons';

interface Voice {
  name: string;
  hasVariants: boolean;
}

interface VoiceSectionProps {
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

const VoiceSection: React.FC<VoiceSectionProps> = ({
  selectedVoice,
  setSelectedVoice,
}) => {
  // 语音选项
  const voices: Voice[] = [
    { name: 'Alloy', hasVariants: false },
    { name: 'Ash', hasVariants: true },
    { name: 'Ballad', hasVariants: true },
    { name: 'Coral', hasVariants: true },
    { name: 'Echo', hasVariants: false },
    { name: 'Fable', hasVariants: false },
    { name: 'Onyx', hasVariants: false },
    { name: 'Nova', hasVariants: false },
    { name: 'Sage', hasVariants: true },
    { name: 'Shimmer', hasVariants: false },
    { name: 'Verse', hasVariants: true },
  ];

  const handleRandomVoice = () => {
    const randomIndex = Math.floor(Math.random() * voices.length);
    setSelectedVoice(voices[randomIndex].name);
  };

  return (
    <div className="flex flex-1 flex-col shrink-0 mb-8">
      <div className="flex flex-row justify-between items-center gap-2 mb-6">
        <div className="flex uppercase py-1 text-sm font-medium tracking-wider text-gray-500/90">VOICE</div>
        <div className="flex flex-1 h-[1px] bg-gradient-to-r from-gray-200/30 via-gray-200/50 to-gray-200/30"></div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {voices.map((voice) => (
          <div
            key={voice.name}
            className="col-span-1"
          >
            <VoiceButton
              name={voice.name}
              selected={selectedVoice === voice.name}
              hasVariants={voice.hasVariants}
              onClick={() => setSelectedVoice(voice.name)}
            />
          </div>
        ))}
        <div className="col-span-1">
          <Button
            color="neutral"
            block
            className="aspect-square min-h-[60px] max-h-[100px] flex items-center justify-center hover:text-gray-900"
            onClick={handleRandomVoice}
            ariaLabel="Select random voice"
          >
            <ShuffleIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSection;
