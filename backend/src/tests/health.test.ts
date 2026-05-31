import request from "supertest";
import app from "../app";

describe("Health Endpoint", () => {
  it("should return application status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "UP",
    });
  });
});