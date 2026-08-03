import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none ${className}`}
      {...props}
    />
  );
}