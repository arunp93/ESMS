import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { errorMiddleware } from "./middleware/error.middleware";

import healthRouter from "./routes/health.route";
import employeeRouter from "./routes/employee.route";
import salaryRouter from "./routes/salary.route";
import analyticsRouter from "./routes/analytics.route";
import authRouter from "./routes/auth.route";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin:
      "*",
    credentials: true,
  })
);

app.use(morgan("combined"));

app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Employee Salary Management API");
});

app.use("/health", healthRouter);
app.use("/employees", employeeRouter);
app.use("/employees", salaryRouter);
app.use("/analytics",analyticsRouter);
app.use("/auth",authRouter);

app.use(errorMiddleware);

export default app;