import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountRoute } from './routes/get-subscriber-invite-count-route'
import { getSubsriberRankingPositionRoute } from './routes/get-subscriber-invite-position-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const PORT = env.PORT
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
	origin: 'http://localhost:3000',
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Nlw Connect',
			version: '0.0.1',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubsriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: PORT }).then(() => {
	console.log(
		`
	Http server running on port ${PORT}

	Oppen Docs in http://localhost:${PORT}/docs

`
	)
})
