import { useForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export type ZodFormValues<S extends z.ZodTypeAny> = z.infer<S>;

interface Props<S extends z.ZodTypeAny> extends Omit<UseFormProps<ZodFormValues<S>>, "resolver"> {
  schema: S;
}

export function useZodForm<S extends z.ZodTypeAny>(props: Props<S>) {
  const form = useForm<ZodFormValues<S>>({
    ...props,
    resolver: zodResolver(props.schema),
  });

  return form;
}
