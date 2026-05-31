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
            },
        };

        const service = new EmployeeService(
            mockPrisma as any
        );

        const result =
            await service.getEmployees();

        expect(result).toHaveLength(1);
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

});