import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";

import healthRouter from "./routes/health.route";
import employeeRouter from "./routes/employee.route";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Employee Salary Management API");
});

app.use("/health", healthRouter);
app.use("/employees", employeeRouter);

app.use(errorMiddleware);

export default app;