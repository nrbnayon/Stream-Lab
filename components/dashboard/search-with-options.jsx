"use client";

import { Search01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function SearchWithOptions({ placeholder, options = [] }) {
  const [selectedOption, setSelectedOption] = useState(options[0] ?? "");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    //
  }, [searchValue, selectedOption]);

  return (
    <div className="flex gap-5 my-3">
      <div className="relative grow">
        <Input
          placeholder={placeholder ?? "Search Films"}
          type="text"
          className="pl-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-secondary-foreground"
        />
      </div>
      {options.length > 0 ? (
        <div className="flex gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              className="border"
              variant={selectedOption === option ? "default" : "secondary"}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
