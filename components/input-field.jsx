"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons/index";

export default function InputField({
  name = "",
  label,
  type = "text",
  placeholder = "",
  leftIcon,
  rightIcon,
  className,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {/* label if exist */}
      {label && <label className="text-lg font-medium">{label}</label>}
      <div className={cn("relative", className)}>
        {/* left icon if applicable */}
        {leftIcon && (
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-secondary-foreground">
            {leftIcon}
          </span>
        )}

        {/* main input field */}
        <Input
          type={!showPassword ? type : "text"}
          className={`w-full ${leftIcon ? "pl-8" : ""} ${
            rightIcon || type === "password" ? "pr-8" : ""
          }`}
          placeholder={placeholder}
          name={name}
        />

        {/* right icon if applicable */}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground">
            {rightIcon}
          </span>
        )}

        {/* show/hide icon only for password */}
        {type === "password" && (
          <span
            className={`${
              type === "password"
                ? "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-secondary-foreground"
                : "hidden"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <HugeiconsIcon icon={ViewOffSlashIcon} />
            ) : (
              <HugeiconsIcon icon={ViewIcon} />
            )}
          </span>
        )}
      </div>
    </>
  );
}
