import { AnalyticsService } from "../../services/analytics.service";

describe("AnalyticsService", () => {
  it("should calculate payroll summary", async () => {
    const mockPrisma = {
      employee: {
        count: jest
          .fn()
          .mockResolvedValue(3),
      },
      salary: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            {
              baseSalary: 1000,
              bonus: 100,
            },
            {
              baseSalary: 2000,
              bonus: 200,
            },
          ]),
      },
    };

    const service =
      new AnalyticsService(
        mockPrisma as any
      );

    const result =
      await service.getPayrollSummary();

    expect(
      result.employeeCount
    ).toBe(3);

    expect(
      result.totalPayroll
    ).toBe(3300);

    expect(
      result.averageSalary
    ).toBe(1650);
  });

  it("should return highest paid employees", async () => {
    const mockPrisma = {
      salary: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            {
              baseSalary: 5000,
              bonus: 500,
              employee: {
                id: 1,
                employeeCode:
                  "EMP001",
                firstName:
                  "Arun",
                lastName: "P",
                department:
                  "Engineering",
              },
            },
          ]),
      },
    };

    const service =
      new AnalyticsService(
        mockPrisma as any
      );

    const result =
      await service.getHighestPaidEmployees();

    expect(result)
      .toHaveLength(1);

    expect(
      result[0].employeeCode
    ).toBe("EMP001");
  });

  it("should return department salary breakdown", async () => {
    const mockPrisma = {
      salary: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            {
              baseSalary: 1000,
              bonus: 100,
              employee: {
                department:
                  "Engineering",
              },
            },
            {
              baseSalary: 2000,
              bonus: 200,
              employee: {
                department:
                  "Engineering",
              },
            },
          ]),
      },
    };

    const service =
      new AnalyticsService(
        mockPrisma as any
      );

    const result =
      await service.getDepartmentBreakdown();

    expect(result)
      .toHaveLength(1);

    expect(
      result[0].department
    ).toBe("Engineering");

    expect(
      result[0].employeeCount
    ).toBe(2);
  });
});