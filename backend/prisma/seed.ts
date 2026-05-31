import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
];

const DESIGNATIONS = [
  "Associate",
  "Senior Associate",
  "Lead",
  "Manager",
  "Director",
];

async function main() {
  console.log(
    "Cleaning existing data..."
  );

  await prisma.salaryHistory.deleteMany();

  await prisma.salary.deleteMany();

  await prisma.employee.deleteMany();

  console.log(
    "Generating employees..."
  );

  const employees = [];

  for (
    let i = 1;
    i <= 10000;
    i++
  ) {
    employees.push({
      employeeCode: `EMP${String(
        i
      ).padStart(5, "0")}`,

      firstName:
        faker.person.firstName(),

      lastName:
        faker.person.lastName(),

      email:
        `employee${i}@acme.com`,

      department:
        DEPARTMENTS[
          Math.floor(
            Math.random() *
            DEPARTMENTS.length
          )
        ],

      designation:
        DESIGNATIONS[
          Math.floor(
            Math.random() *
            DESIGNATIONS.length
          )
        ],
    });
  }

  await prisma.employee.createMany({
    data: employees,
  });

  console.log(
    "Employees created"
  );

  const dbEmployees =
    await prisma.employee.findMany({
      select: {
        id: true,
      },
    });

  console.log(
    "Generating salaries..."
  );

  await prisma.salary.createMany({
    data: dbEmployees.map(
      (employee) => ({
        employeeId:
          employee.id,

        baseSalary:
          faker.number.int({
            min: 300000,
            max: 3000000,
          }),

        bonus:
          faker.number.int({
            min: 0,
            max: 500000,
          }),

        effectiveDate:
          new Date(),
      })
    ),
  });

  console.log(
    "Seed completed"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });