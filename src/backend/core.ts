import type { ResolversType } from 'soki';
import type { RootSchema } from '@shared/schemas/root.schema';

export interface Context {}

export type Resolvers = ResolversType<typeof RootSchema, Context>;

export { createResolver, createRootResolver } from 'soki';
