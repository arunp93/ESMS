import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest
  extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith(
      "Bearer "
    )
  ) {
    return res.status(401).json({
      message:
        "Authentication required",
    });
  }

  const token =
    authHeader.replace(
      "Bearer ",
      ""
    );

  try {
    const payload =
      jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as {
        userId: number;
        role: string;
      };

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}