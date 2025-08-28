import React from "react";
import { IconCheck } from "../svg";
interface CheckBoxTagProps {
  id: string;
  label: string;
  name?: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const CheckBoxTag = ({
  id,
  label,
  checked,
  value,
  defaultChecked,
  onChange,
  name,
  disabled,
  className,
  ...props
}: CheckBoxTagProps) => {
  return (
    <label
      htmlFor={id}
      className={`px-4 py-3 relative  rounded-[10px] border-2 border-blue-100 flex items-center flex-row-reverse gap-2 ${className} cursor-pointer has-checked:border-blue-600`}
    >
      <p className="text-preset-6-regular text-neutral-900 ">{label}</p>
      <div className="relative w-4 h-4">
        <input
          {...props}
          id={id}
          name={name}
          type="checkbox"
          className="peer absolute left-0 top-1/2 -translate-y-1/2 opacity-0 h-4 w-4 "
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        <span
          className={`
              absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4
              rounded-[4px] bg-neutral-0 border-2 border-blue-200
              transition-colors duration-100
              peer-hover:border-blue-600/80
              peer-focus:border-blue-600/
              peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-blue-600/80
              peer-checked:bg-blue-600 
              peer-checked:border-blue-600
             
            `}
        />
        <IconCheck className="opacity-0 peer-checked:opacity-100 absolute left-1/2 -translate-1/2 top-1/2 -translate-y-1/2 h-3 w-3 text-white transition-all duration-100" />
      </div>
    </label>
  );
};

export default CheckBoxTag;
