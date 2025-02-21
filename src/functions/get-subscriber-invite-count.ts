import { redis } from '../redis/client'

interface GetSubsriberInviteCountParams {
	subscriberId: string
}

export async function getSubsriberInviteCount({
	subscriberId,
}: GetSubsriberInviteCountParams) {
	const count = await redis.zscore('referral:ranking', subscriberId)

	return {
		count: count ? Number.parseInt(count) : 0,
	}
}
