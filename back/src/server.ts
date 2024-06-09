import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

// Define a interface para o body da requisição
interface RequestBody {
  email: string;
}

const app = fastify({ logger: true });

app.register(fastifyCors);

const prisma = new PrismaClient();

app.post<{ Body: RequestBody }>('/subscribe', async (request, reply) => {
  const { email } = request.body;
  if (!email) {
    reply.code(400).send({ error: 'Email is required' });
    return;
  }

  try {
    const subscription = await prisma.subscription.create({
      data: { email },
    });
    reply.code(201).send(subscription);
  } catch (error: any) {
    console.error('Failed to subscribe:', error);

    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      reply.code(400).send({ error: 'Email already exists' });
    } else {
      reply.code(500).send({ error: 'Failed to subscribe' });
    }
  }
});

// Rota GET para listar todas as inscrições
app.get('/subscribe', async (request, reply) => {
  try {
    // Recupera todas as inscrições do banco de dados usando o Prisma
    const subscriptions = await prisma.subscription.findMany();
    reply.send(subscriptions);
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    reply.code(500).send({ error: 'Failed to fetch subscriptions' });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 5000 });
    app.log.info('Server is running on port 5000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
