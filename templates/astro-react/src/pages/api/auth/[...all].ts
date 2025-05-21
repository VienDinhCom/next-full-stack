import type { APIRoute } from "astro";

import { auth } from "@src/shared/lib/auth/auth";

export const ALL: APIRoute = async (ctx) => {
  ctx.request.headers.set("x-forwarded-for", ctx.clientAddress); // for rate limiting

  return auth.handler(ctx.request);
};
