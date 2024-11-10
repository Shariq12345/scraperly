"use client";
import React, { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StringParamProps } from "@/types/app-node";

export default function StringParam({
  param,
  value,
  updateNodeParamValue,
}: StringParamProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const id = useId();
  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-1">*</p>}
      </Label>
      <Input
        id={id}
        className="text-xs"
        value={internalValue}
        placeholder="Enter value"
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}
