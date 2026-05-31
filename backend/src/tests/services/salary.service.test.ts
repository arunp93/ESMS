import { SalaryService } from "../../services/salary.service";

describe("SalaryService", () => {
  describe("updateSalary", () => {
    it("should create salary when none exists", async () => {
      const mockPrisma = {
        employee: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
        salary: {
          findUnique: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue({
            id: 1,
            employeeId: 1,
            baseSalary: 1000000,
            bonus: 100000,
          }),
        },
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      const result = await service.updateSalary(1, {
        baseSalary: 1000000,
        bonus: 100000,
        effectiveDate: new Date(),
      });

      expect(
        mockPrisma.salary.create
      ).toHaveBeenCalled();

      expect(result.employeeId).toBe(1);
    });

    it("should update existing salary", async () => {
      const mockPrisma = {
        employee: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
        salary: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
            employeeId: 1,
            baseSalary: 1000000,
            bonus: 100000,
          }),
          update: jest.fn().mockResolvedValue({
            id: 1,
            employeeId: 1,
            baseSalary: 1200000,
            bonus: 150000,
          }),
        },
        salaryHistory: {
          create: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      const result = await service.updateSalary(1, {
        baseSalary: 1200000,
        bonus: 150000,
        effectiveDate: new Date(),
      });

      expect(
        mockPrisma.salary.update
      ).toHaveBeenCalled();

      expect(result.baseSalary).toBe(
        1200000
      );
    });

    it("should create salary history before update", async () => {
      const mockPrisma = {
        employee: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
        salary: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
            employeeId: 1,
            baseSalary: 1000000,
            bonus: 100000,
          }),
          update: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
        salaryHistory: {
          create: jest.fn().mockResolvedValue({
            id: 1,
          }),
        },
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      await service.updateSalary(1, {
        baseSalary: 1200000,
        bonus: 150000,
        effectiveDate: new Date(),
      });

      expect(
        mockPrisma.salaryHistory.create
      ).toHaveBeenCalledTimes(1);

      expect(
        mockPrisma.salary.update
      ).toHaveBeenCalledTimes(1);
    });

    it("should throw when employee does not exist", async () => {
      const mockPrisma = {
        employee: {
          findUnique: jest.fn().mockResolvedValue(
            null
          ),
        },
        salary: {},
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      await expect(
        service.updateSalary(999, {
          baseSalary: 1000000,
          bonus: 100000,
          effectiveDate: new Date(),
        })
      ).rejects.toThrow(
        "Employee not found"
      );
    });
  });

  describe("getSalaryHistory", () => {
    it("should return salary history", async () => {
      const mockPrisma = {
        salaryHistory: {
          findMany: jest.fn().mockResolvedValue([
            {
              id: 1,
              oldBaseSalary: 1000000,
              newBaseSalary: 1200000,
            },
          ]),
        },
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      const result =
        await service.getSalaryHistory(1);

      expect(
        mockPrisma.salaryHistory.findMany
      ).toHaveBeenCalledWith({
        where: {
          employeeId: 1,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      expect(result).toHaveLength(1);
    });

    it("should return empty history when no changes exist", async () => {
      const mockPrisma = {
        salaryHistory: {
          findMany: jest.fn().mockResolvedValue([]),
        },
      };

      const service = new SalaryService(
        mockPrisma as any
      );

      const result =
        await service.getSalaryHistory(1);

      expect(result).toEqual([]);
    });
  });
});