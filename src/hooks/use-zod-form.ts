import { useForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodSchema } from "zod";

export type Values<S extends ZodSchema> = z.infer<S>;

interface Props<S extends ZodSchema>
  extends Omit<UseFormProps<Values<S>>, "resolver"> {
  schema: S;
}

export function useZodForm<S extends ZodSchema>(props: Props<S>) {
  const form = useForm<Values<S>>({
    ...props,
    resolver: zodResolver(props.schema),
  });

  return form;
}