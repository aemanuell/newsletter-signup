"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default);
const prisma = new client_1.PrismaClient();
app.post('/subscribe', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = request.body;
    if (!email) {
        reply.code(400).send({ error: 'Email is required' });
        return;
    }
    try {
        const subscription = yield prisma.subscription.create({
            data: { email },
        });
        reply.code(201).send(subscription);
    }
    catch (error) {
        console.error('Failed to subscribe:', error);
        if (error.code === 'P2002' && ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target.includes('email'))) {
            reply.code(400).send({ error: 'Email already exists' });
        }
        else {
            reply.code(500).send({ error: 'Failed to subscribe' });
        }
    }
}));
// Rota GET para listar todas as inscrições
app.get('/subscribe', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recupera todas as inscrições do banco de dados usando o Prisma
        const subscriptions = yield prisma.subscription.findMany();
        reply.send(subscriptions);
    }
    catch (error) {
        console.error('Failed to fetch subscriptions:', error);
        reply.code(500).send({ error: 'Failed to fetch subscriptions' });
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: 5000 });
        app.log.info('Server is running on port 5000');
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
