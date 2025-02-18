import { fastifyCors } from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';

const PORT = process.env.PORT || 8423
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nlw Connect',
      version: '0.0.1'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(subscribeToEventRoute)

app.get('/', (_request, reply) => {
  return reply.status(200).send({
    hello: 'world'
  })
})

app.listen({ port: PORT as number }).then(() => {
  console.log(`Http server running on port ${PORT}, Open Url: http://localhost:${PORT}`)
})