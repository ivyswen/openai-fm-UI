import React, { ReactNode } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  label?: ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  id,
  label,
}) => {
  return (
    <div className="flex items-center cursor-pointer hover:text-gray-600 transition-colors">
      {label && (
        <label
          className="pr-3 leading-none uppercase text-xs font-medium tracking-wider text-gray-500 cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        value="on"
        id={id}
        onClick={onChange}
        className={`relative inline-flex h-[24px] w-[44px] flex-shrink-0 rounded-full border border-gray-200/50 transition-all duration-200 ease-out focus:outline-none ${
          checked 
            ? 'bg-primary/90 hover:bg-primary border-primary/30' 
            : 'bg-white/90 hover:bg-white'
        } shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]`}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white transition-all duration-200 ease-out ${
            checked 
              ? 'translate-x-[20px] shadow-[0_2px_4px_rgba(249,75,6,0.2)]' 
              : 'translate-x-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
