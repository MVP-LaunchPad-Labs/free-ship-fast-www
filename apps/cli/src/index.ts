import { createCli, trpcServer, type TrpcCliMeta } from 'trpc-cli';
import {
	ProjectNameSchema,
	DatabaseSchema,
	PackageManagerSchema,
	AuthSchema,
	PaymentSchema,
	AnalyticsSchema,
} from './types';
import z from 'zod';
import { createProjectHandler } from './helpers/projectGeneration/commandHandlers';

const t = trpcServer.initTRPC.meta<TrpcCliMeta>().create();

const router = t.router({
	add: t.procedure
		.meta({
			description: 'Create free ship fast',
			default: true,
			negateBooleans: true,
		})
		.input(
			z.tuple([
				ProjectNameSchema.optional(),
				z.object({
					yes: z
						.boolean()
						.optional()
						.default(false)
						.describe('Use default configuration'),
					database: DatabaseSchema.optional(),
					auth: AuthSchema.optional(),
					payment: PaymentSchema.optional(),
					analytics: AnalyticsSchema.optional(),
					git: z.boolean().optional(),
					packageManager: PackageManagerSchema.optional(),
					install: z.boolean().optional(),
				}),
			])
		)
		.mutation(async ({ input }) => {
			const [projectName, options] = input;
			const combinedInput = {
				projectName,
				...options,
			};
			await createProjectHandler(combinedInput);
		}),
});

createCli({ router }).run();
