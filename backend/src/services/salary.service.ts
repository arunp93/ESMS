import prisma from "../lib/prisma";
import { UpdateSalaryDto } from "../validators/salary.validator";

export class SalaryService {
    constructor(
        private readonly db = prisma
    ) { }

    async updateSalary(
        employeeId: number,
        data: UpdateSalaryDto
    ) {
        const employee =
            await this.db.employee.findUnique({
                where: { id: employeeId },
            });

        if (!employee) {
            throw new Error(
                "Employee not found"
            );
        }

        const existingSalary =
            await this.db.salary.findUnique({
                where: {
                    employeeId,
                },
            });

        if (existingSalary) {
            await this.db.salaryHistory.create({
                data: {
                    employeeId,

                    oldBaseSalary:
                        existingSalary.baseSalary,

                    newBaseSalary:
                        data.baseSalary,

                    oldBonus:
                        existingSalary.bonus,

                    newBonus:
                        data.bonus,

                    effectiveDate:
                        data.effectiveDate,
                },
            });
            return this.db.salary.update({
                where: {
                    employeeId,
                },
                data,
            });
        }

        return this.db.salary.create({
            data: {
                employeeId,
                ...data,
            },
        });
    }

    async getSalaryHistory(
        employeeId: number
    ) {
        return this.db.salaryHistory.findMany({
            where: {
                employeeId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}