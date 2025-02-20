import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type InputProps<T extends FieldValues> = Omit<
  ComponentProps<"input">,
  "name"
> & {
  name: Path<T>;
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Input = <T extends FieldValues>({
  className,
  type,
  name,
  label,
  helperText,
  error,
  fullWidth = true,
  startIcon,
  endIcon,
  ...props
}: InputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message as string;
  const hasError = error || !!errorMessage;

  return (
    <div
      className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-fit")}
    >
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-sm font-medium text-foreground",
            hasError && "text-destructive"
          )}
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative">
            {startIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {startIcon}
              </div>
            )}

            <input
              {...field}
              id={name}
              type={type}
              data-slot="input"
              aria-invalid={hasError}
              className={cn(
                "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4",
                startIcon && "pl-10",
                endIcon && "pr-10",
                className
              )}
              {...props}
            />

            {endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {endIcon}
              </div>
            )}
          </div>
        )}
      />

      {(helperText || errorMessage) && (
        <p
          className={cn(
            "text-sm",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export { Input };
