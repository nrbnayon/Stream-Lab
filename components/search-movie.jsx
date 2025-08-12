"use client";

import { cn } from "@/lib/utils";
import InputField from "./input-field";

export default function SearchMovie({ placeholder, leftIcon, className }) {
  return (
    <>
      <InputField
        placeholder={placeholder}
        leftIcon={leftIcon}
        className={cn(className)}
      />
    </>
  );
}
