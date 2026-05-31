import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error(error);

    if (
        error.message ===
        "Employee already exists"
    ) {
        return res.status(409).json({
            message: error.message,
        });
    }

    if (
        error.message ===
        "Employee not found"
    ) {
        return res.status(404).json({
            message: error.message,
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
}