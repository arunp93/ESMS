import express from "express";
import request from "supertest";

import {
  withETag,
} from "../../middleware/etag.middleware";

describe(
  "etag middleware",
  () => {
    const app = express();

    app.get(
      "/test",
      withETag,
      (_req, res) => {
        res.json({
          hello: "world",
        });
      }
    );

    it(
      "should return etag header",
      async () => {
        const response =
          await request(app)
            .get("/test");

        expect(
          response.headers.etag
        ).toBeDefined();
      }
    );

    it(
      "should return 304 when etag matches",
      async () => {
        const first =
          await request(app)
            .get("/test");

        const second =
          await request(app)
            .get("/test")
            .set(
              "If-None-Match",
              first.headers.etag
            );

        expect(
          second.status
        ).toBe(304);
      }
    );
  }
);