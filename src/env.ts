import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(8423),
})

export const env = envSchema.parse(process.env)
