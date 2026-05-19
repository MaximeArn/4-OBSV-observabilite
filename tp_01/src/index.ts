import express from "express";
import { collectDefaultMetrics, register } from "prom-client";

const app = express();
const port = 3000;

register.setDefaultLabels({
  app: "demo-server",
});

collectDefaultMetrics();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
