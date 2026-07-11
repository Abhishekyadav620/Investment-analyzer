import { useState } from "react";

const FloatingInput = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  icon: Icon,
  rightElement,
  required = true,
  error,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const isFilled = value !== undefined && value !== null && value.toString().length > 0;

  return (
    <div className="relative mb-3.5 w-full">
      <div
        className={`group relative flex items-center rounded-xl border bg-white transition-all duration-300 ${error
            ? "border-red-500 ring-2 ring-red-500/10"
            : focused
              ? "border-[#FF6B2C] ring-2 ring-[#FF6B2C]/20 shadow-[0_0_12px_rgba(255,107,44,0.1)]"
              : "border-[#FFD8C4] hover:border-[#FF8A4D]"
          }`}
      >
        {Icon && (
          <div className="pl-4 text-[#6B7280] group-hover:text-gray-500 transition-colors">
            <Icon size={16} />
          </div>
        )}

        <div className="relative flex-1">
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full bg-transparent py-2.5 text-[15px] font-semibold text-[#111827] outline-none transition-all ${Icon ? "pl-2" : "pl-4"
              } ${rightElement ? "pr-10" : "pr-4"}`}
            required={required}
            {...props}
          />

          <label
            htmlFor={id}
            className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-xs transition-all duration-200 origin-left ${Icon ? "left-2" : "left-4"
              } ${focused || isFilled
                ? "-translate-y-[24px] scale-[0.8] text-[#FF6B2C] bg-white px-1.5"
                : "text-gray-400"
              }`}
          >
            {label}
          </label>
        </div>

        {rightElement && (
          <div className="absolute right-3 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <span className="mt-1 block pl-2 text-[11px] font-bold text-red-500 animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};

export default FloatingInput;
