const { Point } = require("@influxdata/influxdb3-client");
const User = require("../models/User");
const Chart = require("../models/Chart");
const { influxDb } = require("../config");
const WebSocket = require("../index");
const connectedClients = new Map();
const intervals = new Map();

async function writeDataToInflux(client, database, runzid, headers) {
  /* headers.map(async (ele) => {
    const point = new Point();
    const pointTemplate = Object.freeze(
      point.measurement("stat").tag("unit", ele)
    );

    const p2 = pointTemplate
      .floatField("avg", 24.5)
      .floatField("max", 45.0);

    await client.write(p2, database);
  });
  closeConnect(runzid); */
}

const startConnect = async (runzid, valuesHeaders) => {
  await WebSocket.wssInstancePromise;
  const wss = await WebSocket.wssInstancePromise;
  wss.on("connection", async (ws) => {
    connectedClients.set(runzid, ws);
    const { client, database } = await influxDb();
    const intervalId = setInterval(async () => {
      await writeDataToInflux(client, database, runzid, valuesHeaders);
    }, 5000);
    intervals.set(runzid, intervalId);
  });
};

const closeConnect = (runzid) => {
  if (intervals.has(runzid)) {
    clearInterval(intervals.get(runzid));
    intervals.delete(runzid);
  }
  connectedClients.delete(runzid);
};

const createChart = async (req, res, next) => {
  try {
    const { runzId, values } = req.body;
    await startConnect(runzId, values);
    return res.status(200).json({ message: "Data streaming started" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error. Please try again" });
  }
};
const listCharts = async (req, res) => {
  try {
    let temp = await User.findOne({ userId: req.user.userId }).lean();
    temp = temp.chartIds.map((ele) => ele.toString());
    return res.status(200).json(temp);
  } catch (error) {
    return res.status(500).json({ error: "Server error. Please try again" });
  }
};
const readInflux = async (req, res) => {
  try {
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error: "Server error. Please try again" });
  }
};
module.exports = {
  createChart,
  listCharts,
  readInflux,
};
