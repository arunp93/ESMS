import { EmployeeService } from "../../services/employee.service";

describe("EmployeeService", () => {
    it("should create employee", async () => {
        const mockPrisma = {
            employee: {
                create: jest.fn().mockResolvedValue({
                    id: 1,
                    employeeCode: "EMP001",
                    firstName: "Arun",
                    lastName: "P",
                    email: "arun@example.com",
                    department: "Engineering",
                    designation: "Backend Engineer",
                }),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        const result = await service.createEmployee({
            employeeCode: "EMP001",
            firstName: "Arun",
            lastName: "P",
            email: "arun@example.com",
            department: "Engineering",
            designation: "Backend Engineer",
        });

        expect(mockPrisma.employee.create).toHaveBeenCalled();

        expect(result.employeeCode).toBe("EMP001");
    });

    it("should return employee list", async () => {
        const mockPrisma = {
            employee: {
                findMany: jest.fn().mockResolvedValue([
                    { id: 1 },
                ]),
                count: jest.fn().mockResolvedValue(1),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        const result = await service.getEmployees();

        expect(result.data).toHaveLength(1);

        expect(result.pagination.total)
            .toBe(1);
    });

    it("should return employee by id", async () => {
        const mockPrisma = {
            employee: {
                findUnique: jest.fn().mockResolvedValue({
                    id: 1,
                }),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        const result =
            await service.getEmployeeById(1);

        expect(result?.id).toBe(1);
    });

    it("should return paginated employees", async () => {
        const mockPrisma = {
            employee: {
                findMany: jest
                    .fn()
                    .mockResolvedValue([{ id: 1 }]),
                count: jest
                    .fn()
                    .mockResolvedValue(1),
            },
        };

        const service =
            new EmployeeService(
                mockPrisma as any
            );

        const result =
            await service.getEmployees();

        expect(result.pagination.total)
            .toBe(1);
    });

    it("should search employees", async () => {
        const mockPrisma = {
            employee: {
                findMany: jest
                    .fn()
                    .mockResolvedValue([]),
                count: jest
                    .fn()
                    .mockResolvedValue(0),
            },
        };

        const service =
            new EmployeeService(
                mockPrisma as any
            );

        await service.getEmployees(
            1,
            20,
            "arun"
        );

        expect(
            mockPrisma.employee.findMany
        ).toHaveBeenCalled();
    });

    it("should update employee", async () => {
        const mockPrisma = {
            employee: {
                findUnique: jest.fn().mockResolvedValue({
                    id: 1,
                }),
                update: jest.fn().mockResolvedValue({
                    id: 1,
                    designation: "Senior Backend Engineer",
                }),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        const result = await service.updateEmployee(
            1,
            {
                designation:
                    "Senior Backend Engineer",
            }
        );

        expect(
            mockPrisma.employee.findUnique
        ).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });

        expect(
            mockPrisma.employee.update
        ).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
            data: {
                designation:
                    "Senior Backend Engineer",
            },
        });

        expect(
            result.designation
        ).toBe(
            "Senior Backend Engineer"
        );
    });

    it("should throw when employee does not exist", async () => {
        const mockPrisma = {
            employee: {
                findUnique: jest.fn().mockResolvedValue(
                    null
                ),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        await expect(
            service.updateEmployee(999, {
                designation:
                    "Senior Backend Engineer",
            })
        ).rejects.toThrow(
            "Employee not found"
        );

        expect(
            mockPrisma.employee.findUnique
        ).toHaveBeenCalledWith({
            where: {
                id: 999,
            },
        });
    });

    it("should not update missing employee", async () => {
        const mockPrisma = {
            employee: {
                findUnique: jest.fn().mockResolvedValue(
                    null
                ),
                update: jest.fn(),
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        await expect(
            service.updateEmployee(999, {
                designation:
                    "Senior Backend Engineer",
            })
        ).rejects.toThrow(
            "Employee not found"
        );

        expect(
            mockPrisma.employee.update
        ).not.toHaveBeenCalled();
    });

});