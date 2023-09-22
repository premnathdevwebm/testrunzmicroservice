const mongoose = require("mongoose");
const { createClient } = require("redis");
const amqp = require("amqplib");
const { InfluxDBClient } = require("@influxdata/influxdb3-client");

const User = require("../models/User");

let channel, connection;

mongoose.set("strictQuery", false);


async function influxDb() {
  const database = process.env.INFLUXbucketdatabase;
  const client = new InfluxDBClient({ host: process.env.INFLUXURL, token: process.env.INFLUXTOKEN });
  const line = `stat,unit=temperature avg=20.5,max=45.0`
await client.write(line, database)
  return new Promise((resolve, reject) => {
    resolve({ client, database });
    reject(new Error("Error connecting to InfluxDB"));
  });
}

async function db() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", function (err) {
    console.error(err);
  });
  mongoose.connection.on("connected", function () {
    console.log("Chart db Connected");
  });
}

const redisClient = createClient({
  socket: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));

async function connectMessageQue() {
  try {
    connection = await amqp.connect(
      `${process.env.RABBIT_MQ_URI}`,
      (err, conn) => {
        if (err) throw err;
        return conn;
      }
    );
    console.log("Messaging system started");
    channel = await connection.createChannel();
    await channel.assertQueue(process.env.RABBIT_MQ_CHART);
    channel.consume(process.env.RABBIT_MQ_CHART, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        if (!data.type) {
        await User.findOneAndUpdate(
          { userId: data.id, email: data.email },
          {
            userId: data.id,
            userCounter: data.counter,
            name: data.name,
            email: data.email,
            role: data.role,
            organization: data.organization,
            department: [data.department],
          },
          { upsert: true, new: true }
        );
        channel.ack(msg);
        }
        if (data.type === "createuser") {
          const { type, ...remaining } = data;
          await User.create({ ...remaining });
          channel.ack(msg);
        }
        if (data.type === "removeuser") {
          channel.ack(msg);
        }
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { db, influxDb, redisClient, connectMessageQue };
