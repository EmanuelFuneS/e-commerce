import Fastify from "fastify";
import {
  productRoutes,
  brandRoutes,
  categoryRoutes,
  clientRoutes,
  ordersRoutes,
  analyticsRoutes,
} from "./routes";
import fastifyJwt from "@fastify/jwt";
import globalEnv from "@workspace/env";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});

app.get("/", async () => {
  return { status: "ok" };
});

app.register(fastifyJwt, {
  secret: globalEnv.JWT_SECRET,
});

app.register(productRoutes, { prefix: "/products" });
app.register(brandRoutes, { prefix: "/brands" });
app.register(categoryRoutes, { prefix: "/categories" });
app.register(clientRoutes, { prefix: "/clients" });
app.register(ordersRoutes, { prefix: "/orders" });
app.register(analyticsRoutes, { prefix: "/analytics" });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
