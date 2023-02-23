import * as SelectPrimitive from "@radix-ui/react-select";
import classNames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { SUPPORTED_TOKENS } from "@/lib/constants";

type SelectProps = {
  value: any;
  onValueChange: any;
};

export const Select = (props: SelectProps) => {
  const currentIcon = SUPPORTED_TOKENS.find(
    (v) => v.title === props.value,
  )?.icon;

  return (
    <SelectPrimitive.Root
      value={props.value}
      onValueChange={props.onValueChange}
    >
      <SelectPrimitive.Trigger asChild aria-label="Food">
        <button className="flex h-9 items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-75 hover:border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-blue-500/20 active:bg-gray-100">
          <div className="flex items-center">
            {props.value && currentIcon && (
              <Image
                src={currentIcon}
                alt=""
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
            )}
            <SelectPrimitive.Value>{props.value.title}</SelectPrimitive.Value>
          </div>
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
          <SelectPrimitive.Group>
            {SUPPORTED_TOKENS.map((f, i) => (
              <SelectPrimitive.Item
                key={`${f}-${i}`}
                value={f.title}
                className={classNames(
                  "relative flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900",
                  "radix-disabled:opacity-50",
                  "select-none focus:outline-none",
                )}
              >
                {f.icon && (
                  <Image
                    src={f.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="mr-2 rounded-full"
                  />
                )}
                <SelectPrimitive.ItemText>{f.title}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};
