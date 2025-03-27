import React, { ReactNode } from 'react';

type ButtonVariant = 'default' | 'neutral' | 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  children: ReactNode;
  color?: ButtonVariant;
  block?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  block = false,
  selected = false,
  onClick,
  className = '',
  ariaLabel,
}) => {
  // 基本样式
  const baseStyles = "relative outline-none focus:outline-none flex items-center justify-center rounded-lg p-3";

  // 颜色和3D效果样式 - 优化阴影和质感
  const colorStyles = {
    default: "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-[0_2px_0_0_rgb(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_#fff] hover:shadow-[0_2px_0_0_rgb(0,0,0,0.05),0_6px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_#fff] active:shadow-[0_1px_0_0_rgb(0,0,0,0.05),inset_0_2px_4px_rgba(0,0,0,0.06)] active:translate-y-[1px]",
    neutral: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-[0_2px_0_0_rgb(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_#fff] hover:shadow-[0_2px_0_0_rgb(0,0,0,0.05),0_6px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_#fff] active:shadow-[0_1px_0_0_rgb(0,0,0,0.05),inset_0_2px_4px_rgba(0,0,0,0.06)] active:translate-y-[1px]",
    primary: "bg-[#FF4400] hover:bg-[#FF4400]/95 text-white border border-[#E63E00] shadow-[0_2px_0_0_#CC3700,0_4px_6px_-1px_rgba(255,68,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_2px_0_0_#CC3700,0_6px_8px_-2px_rgba(255,68,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] active:shadow-[0_1px_0_0_#CC3700,inset_0_2px_4px_rgba(204,55,0,0.2)] active:translate-y-[1px]",
    secondary: "bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white border border-black/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_4px_6px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_6px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px]",
    tertiary: "bg-[#4D4D4D] hover:bg-[#4D4D4D]/95 text-white border border-[#333333] shadow-[0_2px_0_0_#262626,0_4px_6px_-1px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_2px_0_0_#262626,0_6px_8px_-2px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] active:shadow-[0_1px_0_0_#262626,inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px]",
  };

  // 选中状态样式
  const selectedStyles = selected ? "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] translate-y-[1px] bg-gray-50" : "";

  // 块级样式
  const blockStyles = block ? "w-full" : "";

  return (
    <div
      className={`${baseStyles} ${colorStyles[color]} ${selectedStyles} ${blockStyles} ${className} transition-all duration-150 ease-out will-change-transform`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

interface VoiceButtonProps {
  name: string;
  selected?: boolean;
  hasVariants?: boolean;
  onClick?: () => void;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  name,
  selected = false,
  hasVariants = false,
  onClick
}) => {
  return (
    <Button
      color="default"
      block
      selected={selected}
      onClick={onClick}
      className="aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 xl:aspect-square min-h-[60px] max-h-[100px] flex-col items-start justify-between p-4 text-sm font-medium hover:bg-[#F5F5F5]"
    >
      <span className="text-[#2B2B2B] font-medium">{name}</span>
      <div className="absolute left-[13px] bottom-[10.5px]">
        <span className={`inline-block w-[6px] h-[6px] rounded-full transition-all duration-200 ${selected
            ? 'bg-[#F94B06] shadow-[0_0_3px_rgba(249,75,6,0.35)]'
            : 'bg-[#D4D4D4]'
          }`}></span>
      </div>
      {hasVariants && (
        <div className="absolute right-[13px] bottom-[10.5px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[12px] h-[12px] text-[#A3A3A3]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5248 3.15838C10.5656 2.4022 11.1831 1.75 12 1.75C12.8169 1.75 13.4344 2.4022 13.4752 3.15836C13.6966 7.25635 16.727 10.2914 20.8187 10.5134C21.5854 10.555 22.25 11.1807 22.25 12.0119C22.25 12.8463 21.5806 13.4727 20.8113 13.5108C16.7255 13.7132 13.6966 16.7437 13.4752 20.8416C13.4344 21.5978 12.8169 22.25 12 22.25C11.1831 22.25 10.5656 21.5978 10.5248 20.8416C10.3034 16.7434 7.2739 13.7126 3.18751 13.5107C2.41877 13.4728 1.75 12.8469 1.75 12.0132C1.75 11.1794 2.41879 10.5537 3.18717 10.5155C7.27028 10.3124 10.3032 7.26175 10.5248 3.15838ZM12.0004 6.01235C11.0373 8.86655 8.848 11.0618 5.99104 12.0117C8.84653 12.9562 11.0364 15.1398 12 17.9892C12.9654 15.1345 15.1615 12.9482 18.0247 12.0066C15.1626 11.0555 12.9661 8.86773 12.0004 6.01235Z"
            />
          </svg>
        </div>
      )}
    </Button>
  );
};

interface VibeButtonProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export const VibeButton: React.FC<VibeButtonProps> = ({
  name,
  selected = false,
  onClick
}) => {
  return (
    <Button
      color="default"
      block
      selected={selected}
      onClick={onClick}
      className="aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 min-h-[60px] max-h-[100px] flex-col items-start justify-between p-4 text-sm font-medium hover:bg-[#F5F5F5]"
    >
      <span className="break-words pr-1 text-[#2B2B2B] font-medium">{name}</span>
      <div className="absolute left-[13px] bottom-[10.5px]">
        <span className={`inline-block w-[6px] h-[6px] rounded-full transition-all duration-200 ${selected
            ? 'bg-[#F94B06] shadow-[0_0_3px_rgba(249,75,6,0.35)]'
            : 'bg-[#D4D4D4]'
          }`}></span>
      </div>
    </Button>
  );
};
