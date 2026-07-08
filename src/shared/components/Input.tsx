import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2">

      <span className="text-sm font-medium text-[#B3B3B3]">
        {label}
      </span>

      <input
        {...props}
        className="rounded-xl border border-[#262626] bg-[#0B0B0B] px-4 py-3 text-white placeholder:text-[#666666] outline-none transition focus:border-[#E5092F]"
      />

    </label>
  );
}