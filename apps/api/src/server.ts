import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
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

app.register(swagger, {
  openapi: {
    info: {
      title: "E-Commerce API",
      description: "REST API for e-commerce platform",
      version: "1.0.0",
    },
    servers: [
      { url: "http://localhost:3000", description: "Development server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
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
