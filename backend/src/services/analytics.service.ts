import prisma from "../lib/prisma";

export class AnalyticsService {
  constructor(
    private readonly db = prisma
  ) {}

  async getPayrollSummary() {
    const employeeCount =
      await this.db.employee.count();

    const salaries =
      await this.db.salary.findMany();

    const totalPayroll =
      salaries.reduce(
        (sum, salary) =>
          sum +
          salary.baseSalary +
          salary.bonus,
        0
      );

    const averageSalary =
      salaries.length === 0
        ? 0
        : totalPayroll /
          salaries.length;

    return {
      employeeCount,
      employeesWithSalary:
        salaries.length,
      totalPayroll,
      averageSalary,
    };
  }

  async getHighestPaidEmployees() {
    const salaries =
      await this.db.salary.findMany({
        take: 10,
        orderBy: {
          baseSalary: "desc",
        },
        include: {
          employee: true,
        },
      });

    return salaries.map(
      (salary) => ({
        employeeId:
          salary.employee.id,
        employeeCode:
          salary.employee
            .employeeCode,
        employeeName:
          `${salary.employee.firstName} ${salary.employee.lastName}`,
        department:
          salary.employee
            .department,
        baseSalary:
          salary.baseSalary,
        bonus: salary.bonus,
      })
    );
  }

  async getDepartmentBreakdown() {
    const salaries =
      await this.db.salary.findMany({
        include: {
          employee: true,
        },
      });

    const departments =
      new Map<
        string,
        {
          department: string;
          employeeCount: number;
          totalSalary: number;
        }
      >();

    for (const salary of salaries) {
      const department =
        salary.employee.department;

      const current =
        departments.get(
          department
        ) ?? {
          department,
          employeeCount: 0,
          totalSalary: 0,
        };

      current.employeeCount += 1;

      current.totalSalary +=
        salary.baseSalary +
        salary.bonus;

      departments.set(
        department,
        current
      );
    }

    return Array.from(
      departments.values()
    ).map((department) => ({
      department:
        department.department,
      employeeCount:
        department.employeeCount,
      totalSalary:
        department.totalSalary,
      averageSalary:
        department.totalSalary /
        department.employeeCount,
    }));
  }
}