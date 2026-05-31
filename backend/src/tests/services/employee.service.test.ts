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

});