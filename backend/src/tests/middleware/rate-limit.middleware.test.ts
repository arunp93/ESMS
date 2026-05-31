import express from "express";
import request from "supertest";

import { loginRateLimiter } from "../../middleware/rate-limit.middleware";

describe("login rate limiter", () => {
  const app = express();

  app.use(express.json());

  app.post(
    "/login",
    loginRateLimiter,
    (_req, res) => {
      res.status(200).json({
        success: true,
      });
    }
  );

  it("should allow requests under the limit", async () => {
    const response = await request(app)
      .post("/login")
      .send({});

    expect(response.status).toBe(200);
  });

  it("should block requests after limit is exceeded", async () => {
    const requests = [];

    for (let i = 0; i < 6; i++) {
      requests.push(
        request(app)
          .post("/login")
          .send({})
      );
    }

    const responses =
      await Promise.all(requests);

    const lastResponse =
      responses[5];

    expect(
      lastResponse.status
    ).toBe(429);

    expect(
      lastResponse.body.message
    ).toBe(
      "Too many login attempts. Please try again later."
    );
  });
});