import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export interface CreateEmployeeInput {
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    designation: string;
}

export class EmployeeService {
    constructor(
        private readonly db = prisma
    ) { }

    async createEmployee(
        data: CreateEmployeeInput
    ) {
        try {
            return await this.db.employee.create({
                data,
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new Error(
                    "Employee already exists"
                );
            }

            throw error;
        }
    }

    async getEmployees(
        page = 1,
        limit = 20,
        search?: string
    ) {
        const skip = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    {
                        firstName: {
                            contains: search,
                        },
                    },
                    {
                        lastName: {
                            contains: search,
                        },
                    },
                    {
                        employeeCode: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            }
            : {};

        const [employees, total] =
            await Promise.all([
                this.db.employee.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
                this.db.employee.count({
                    where,
                }),
            ]);

        return {
            data: employees,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getEmployeeById(id: number) {
        return this.db.employee.findUnique({
            where: {
                id,
            },
        });
    }

    async updateEmployee(
        id: number,
        data: Partial<CreateEmployeeInput>
    ) {
        const employee =
            await this.db.employee.findUnique({
                where: { id },
            });

        if (!employee) {
            throw new Error("Employee not found");
        }

        return this.db.employee.update({
            where: { id },
            data,
        });
    }
}