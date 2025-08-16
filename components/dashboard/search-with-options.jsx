"use client";

import { Search01Icon } from "@hugeicons/core-free-icons/index";
import InputField from "../input-field";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SearchWithOptions({ placeholder, options = [] }) {
  const [selectedOption, setSelectedOption] = useState(options[0] ?? "");
  return (
    <div className="flex gap-5 my-3">
      <InputField
        leftIcon={<HugeiconsIcon icon={Search01Icon} />}
        type="text"
        placeholder={placeholder ?? "Search Films"}
        className="grow"
      />
      {options.length > 0 ? (
        <div className="flex gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
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
