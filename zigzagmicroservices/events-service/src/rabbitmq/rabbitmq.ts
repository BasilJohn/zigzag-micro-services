import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
  channel = await connection.createChannel();
  await channel.assertQueue("EVENT_NOTIFICATIONS");
  console.log("Connected to RabbitMQ - Notification Service.");
  return channel;
};

export const publishToQueue = async (message: object) => {
  if (!channel) throw new Error("RabbitMQ channel not created yet.");
  channel.sendToQueue(
    "EVENT_NOTIFICATIONS",
    Buffer.from(JSON.stringify(message))
  );
};
