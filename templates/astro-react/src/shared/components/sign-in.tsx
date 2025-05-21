import { Button } from "@esmate/shadcn";
import { useZodForm } from "@esmate/shadcn/hooks";
import { z } from "astro:schema";

import { authClient } from "@src/shared/auth";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignIn() {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" {...form.register("email")} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...form.register("password")} />
        </label>
        <br />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
