import express from "express";
import healthRouter from "./routes/health.route";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Employee Salary Management API");
});

app.use("/health", healthRouter);

export default app;