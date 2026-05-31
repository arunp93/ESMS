import prisma from "../lib/prisma";

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

    async createEmployee(data: CreateEmployeeInput) {
        return this.db.employee.create({
            data,
        });
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
}