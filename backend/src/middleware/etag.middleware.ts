import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function withETag(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json.bind(res);

  res.json = function (body: any) {
    const payload = JSON.stringify(body);

    const etag = crypto
      .createHash("md5")
      .update(payload)
      .digest("hex");

    const ifNoneMatch =
      res.req.headers["if-none-match"];

    if (ifNoneMatch === etag) {
      return res.status(304).end();
    }

    res.setHeader(
      "ETag",
      etag
    );

    return originalJson(body);
  };

  next();
}