import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		'/ranking',
		{
			schema: {
				summary: 'Get ranking',
				tags: ['referral'],
				// response: {
				// 	200: z.object({
				// 		count: z.number(),
				// 	}),
				// },
			},
		},
		async request => {
			await getRanking()

			return { ok: 'ok' }
		}
	)
}
