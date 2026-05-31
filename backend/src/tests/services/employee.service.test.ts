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
});