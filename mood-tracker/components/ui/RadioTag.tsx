import React from "react";

interface RadioTagProps {
  id: string;
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const RadioTag = ({
  id,
  label,
  checked,
  value,
  onChange,
  name,
  disabled,
  className,
  ...props
}: RadioTagProps) => {
  return (
    <label
      htmlFor={id}
      className={`px-5 py-3 relative  rounded-[10px] border-2 border-blue-100 flex items-end flex-row-reverse gap-2.5 cursor-pointer has-checked:border-blue-600 ${className} `}
    >
      <p className="text-preset-5 text-neutral-900 ">{label}</p>
      <div className="relative w-5 h-5">
        <input
          {...props}
          id={id}
          name={name}
          value={value}
          type="radio"
          className="peer absolute left-0 top-1/2 -translate-y-1/2 opacity-0 h-5 w-5 "
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span
          className={`
              absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5
              rounded-full bg-neutral-0 border-2 border-blue-200
              transition-colors duration-100
              peer-hover:border-blue-600/80
              peer-focus:border-blue-600/
              peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-blue-600/80
              peer-checked:bg-blue-600 
              peer-checked:border-blue-600
             
            `}
        />
        <span
          className={`
              absolute left-1/2 -translate-1/2 top-1/2 -translate-y-1/2 h-2.5 w-2.5
              rounded-full bg-white opacity-0 peer-checked:opacity-100
            `}
        />
      </div>
    </label>
  );
};

export default RadioTag;
