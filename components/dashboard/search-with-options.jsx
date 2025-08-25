"use client";

import { Search01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SearchWithOptions({
  placeholder,
  options = [],
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState(options[0] ?? "");
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useIsMobile();

  const handleChange = (value, option) => {
    setSearchValue(value);
    setSelectedOption(option);
    if (onChange) {
      onChange({ searchValue: value, selectedOption: option });
    }
  };

  return (
    <div className="flex gap-2 flex-wrap md:gap-5 my-3">
      <div className="relative grow">
        <Input
          placeholder={placeholder ?? "Search Films"}
          type="text"
          className="pl-8! py-1 pr-2 md:p-3"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value, selectedOption)}
        />
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-secondary-foreground"
        />
      </div>
      {options.length > 0 ? (
        <div className="flex gap-1 md:gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              className="border"
              size={isMobile ? "sm" : "default"}
              variant={selectedOption === option ? "default" : "secondary"}
              onClick={() => handleChange(searchValue, option)}
            >
              {option}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
