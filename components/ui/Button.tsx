import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}