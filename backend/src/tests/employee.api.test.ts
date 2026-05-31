import request from "supertest";
import app from "../app";

describe("Employee API", () => {
  it("should reject invalid employee payload", async () => {
    const response = await request(app)
      .post("/employees")
      .send({
        email: "bad-email",
      });

    expect(response.status)
      .toBe(400);
  });
});