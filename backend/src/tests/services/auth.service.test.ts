import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AuthService }
    from "../../services/auth.service";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe(
    "AuthService",
    () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it(
            "should login successfully",
            async () => {
                const mockPrisma = {
                    user: {
                        findUnique:
                            jest.fn()
                                .mockResolvedValue({
                                    id: 1,
                                    email:
                                        "hr.admin@acme.com",
                                    passwordHash:
                                        "hash",
                                    role:
                                        "ADMIN",
                                }),
                    },
                };

                (
                    bcrypt.compare as jest.Mock
                ).mockResolvedValue(
                    true
                );

                (
                    jwt.sign as jest.Mock
                ).mockReturnValue(
                    "jwt-token"
                );

                const service =
                    new AuthService(
                        mockPrisma as any
                    );

                const result =
                    await service.login(
                        "hr.admin@acme.com",
                        "Admin@123"
                    );

                expect(
                    result.accessToken
                ).toBe(
                    "jwt-token"
                );

                expect(
                    result.user.role
                ).toBe(
                    "ADMIN"
                );
            }
        );

        it(
            "should throw when user does not exist",
            async () => {
                const mockPrisma = {
                    user: {
                        findUnique:
                            jest.fn()
                                .mockResolvedValue(
                                    null
                                ),
                    },
                };

                const service =
                    new AuthService(
                        mockPrisma as any
                    );

                await expect(
                    service.login(
                        "missing@test.com",
                        "password"
                    )
                ).rejects.toThrow(
                    "Invalid credentials"
                );
            }
        );

        it(
            "should throw when password is invalid",
            async () => {
                const mockPrisma = {
                    user: {
                        findUnique:
                            jest.fn()
                                .mockResolvedValue({
                                    id: 1,
                                    email:
                                        "hr.admin@acme.com",
                                    passwordHash:
                                        "hash",
                                    role:
                                        "ADMIN",
                                }),
                    },
                };

                (
                    bcrypt.compare as jest.Mock
                ).mockResolvedValue(
                    false
                );

                const service =
                    new AuthService(
                        mockPrisma as any
                    );

                await expect(
                    service.login(
                        "hr.admin@acme.com",
                        "wrong-password"
                    )
                ).rejects.toThrow(
                    "Invalid credentials"
                );
            }
        );
    }
);