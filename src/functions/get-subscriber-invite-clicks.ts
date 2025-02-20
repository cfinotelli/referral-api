import { redis } from '../redis/client'

interface GetSubsriberInviteClicksParams {
	subscriberId: string
}

export async function getSubsriberInviteClicks({
	subscriberId,
}: GetSubsriberInviteClicksParams) {
	const count = await redis.hget('referral:access-count', subscriberId)

	return {
		count: count ? Number.parseInt(count) : 0,
	}
}
