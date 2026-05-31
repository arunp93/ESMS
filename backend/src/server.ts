import express from "express";

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (_req, res) => {
  res.send("Employee Salary Management API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});