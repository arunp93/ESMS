import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../app";

describe("Employee API", () => {
  const token = jwt.sign(
    {
      userId: 1,
      role: "ADMIN",
    },
    "test-secret"
  );

  beforeAll(() => {
    process.env.JWT_SECRET =
      "test-secret";
  });

  it(
    "should reject unauthenticated requests",
    async () => {
      const response =
        await request(app)
          .post("/employees")
          .send({
            employeeCode:
              "EMP001",
          });

      expect(
        response.status
      ).toBe(401);

      expect(
        response.body
      ).toEqual({
        message:
          "Authentication required",
      });
    }
  );

  it(
    "should reject invalid employee payload",
    async () => {
      const response =
        await request(app)
          .post("/employees")
          .set(
            "Authorization",
            `Bearer ${token}`
          )
          .send({
            email:
              "invalid-email",
          });

      expect(
        response.status
      ).toBe(400);

      expect(
        response.body.message
      ).toBe(
        "Validation failed"
      );
    }
  );
});