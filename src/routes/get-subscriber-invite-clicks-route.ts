import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { getSubsriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
	async app => {
		app.get(
			'/subscribers/:subscriberId/ranking/clicks',
			{
				schema: {
					summary: 'Get subscriber invite clicks count',
					tags: ['referral'],
					params: z.object({
						subscriberId: z.string(),
					}),
					response: {
						200: z.object({
							count: z.number(),
						}),
					},
				},
			},
			async request => {
				const { subscriberId } = request.params

				const { count } = await getSubsriberInviteClicks({ subscriberId })

				const redirectUrl = new URL(env.WEB_URL)

				redirectUrl.searchParams.set('referrer', subscriberId)

				return { count }
			}
		)
	}
