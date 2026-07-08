import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {

  const variants = {
    primary:
      "bg-[#E5092F] hover:bg-[#C80727] text-white",

    secondary:
      "border border-[#262626] bg-transparent hover:bg-[#262626] text-white",
  };

  return (
    <button
      {...props}
      className={`w-full rounded-xl py-3 font-semibold transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
