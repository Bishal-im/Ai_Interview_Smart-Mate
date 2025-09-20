import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, Control, Field, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input"; // you also need Input

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}
const FormField = <T extends FieldValues>({
  // const FormField = () =>()
  control,
  name,
  label,
  placeholder,
  type = "text", // default text ( if passed the above)
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="w-full min-w-[400px] bg-white border border-gray-300 
              rounded-full px-6 py-5 text-lg shadow-md
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              hover:border-gray-400 transition-all duration-200"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
