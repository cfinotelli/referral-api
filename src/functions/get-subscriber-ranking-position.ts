import { redis } from '../redis/client'

interface GetSubsriberRankingPositionParams {
	subscriberId: string
}

export async function getSubsriberRankingPosition({
	subscriberId,
}: GetSubsriberRankingPositionParams) {
	const rank = await redis.zrevrank('referral:ranking', subscriberId)

	if (rank === null) {
		return {
			position: null,
		}
	}

	return {
		position: rank + 1,
	}
}
