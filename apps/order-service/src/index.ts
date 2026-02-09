import Fastify from "fastify";
// import { shouldBeUser } from "./middleware/authMiddleware.js";
// import { connectOrderDB } from "@repo/order-db";
// import { orderRoute } from "./routes/order.js";
// import { consumer, producer } from "./utils/kafka.js";
// import { runKafkaSubscriptions } from "./utils/subscriptions.js";

import { clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", (request, reply) => {
  const { isAuthenticated, userId } = getAuth(request);
  if (!userId) {
    return reply.send({ message: "You are not logged in" });
  }
  return reply.send({ message: "Order service is authenticated!" });
});

// fastify.register(orderRoute);

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
