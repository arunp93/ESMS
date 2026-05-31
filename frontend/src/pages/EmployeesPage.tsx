import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import api from "../api/api";

interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [search, setSearch] =
    useState("");

  const loadEmployees =
    async () => {
      const response =
        await api.get(
          `/employees?search=${search}`
        );

      setEmployees(
        response.data.data ??
          response.data
      );
    };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Employees
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={2}
      >
        <TextField
          label="Search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          onClick={
            loadEmployees
          }
        >
          Search
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Code
              </TableCell>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
                Department
              </TableCell>

              <TableCell>
                Designation
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map(
              (
                employee
              ) => (
                <TableRow
                  key={
                    employee.id
                  }
                >
                  <TableCell>
                    {
                      employee.employeeCode
                    }
                  </TableCell>

                  <TableCell>
                    {employee.firstName}{" "}
                    {
                      employee.lastName
                    }
                  </TableCell>

                  <TableCell>
                    {
                      employee.email
                    }
                  </TableCell>

                  <TableCell>
                    {
                      employee.department
                    }
                  </TableCell>

                  <TableCell>
                    {
                      employee.designation
                    }
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}