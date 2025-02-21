import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubsriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubsriberRankingPositionRoute: FastifyPluginAsyncZod =
	async app => {
		app.get(
			'/subscribers/:subscriberId/ranking/position',
			{
				schema: {
					summary: 'Get subscriber invite position',
					tags: ['referral'],
					params: z.object({
						subscriberId: z.string(),
					}),
					response: {
						200: z.object({
							position: z.number().nullable(),
						}),
					},
				},
			},
			async request => {
				const { subscriberId } = request.params

				const { position } = await getSubsriberRankingPosition({
					subscriberId,
				})

				return { position }
			}
		)
	}
