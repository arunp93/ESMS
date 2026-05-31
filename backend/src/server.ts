import express from "express";
import healthRouter from "./routes/health.route";

const app = express();

const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Employee Salary Management API");
});

app.use("/health", healthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});