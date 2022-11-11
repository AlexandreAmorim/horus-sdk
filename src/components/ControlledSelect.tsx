import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { GroupBase, Props as SelectProps, Select } from "chakra-react-select";
import React from "react";
import {
  FieldValues, useController, UseControllerProps
} from "react-hook-form";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
  UseControllerProps<FormValues> {
  label?: string;
  bgColor?: string;
}

export function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  bgColor = 'gray.900',
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        useBasicStyles
        selectedOptionColor="blue"
        chakraStyles={{
          control: (provided) => ({
            ...provided,
            border: 'none',
            background: bgColor,
            cursor: 'pointer',
            height: "3rem"
          }),
          menu: (provided) => ({
            ...provided,
            my: 0,
            borderTopLeftRadius: "md",
            borderTopRightRadius: "md",
            background: bgColor,
            borderBottomRadius: "md",
          }),
          menuList: (provided) => ({
            ...provided,
            background: bgColor,
            borderTopLeftRadius: "md",
            borderTopRightRadius: "md",
            border: 0,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "gray.600" : bgColor,
          })
        }}
        options={options}
        {...selectProps}
        {...field}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}