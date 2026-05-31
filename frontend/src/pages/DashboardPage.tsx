import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

interface PayrollSummary {
  employeeCount: number;
  employeesWithSalary: number;
  totalPayroll: number;
  averageSalary: number;
}

interface TopEmployee {
  employeeId: number;
  employeeCode: string;
  employeeName: string;
  department: string;
  baseSalary: number;
  bonus: number;
}

interface DepartmentBreakdown {
  department: string;
  employeeCount: number;
  totalSalary: number;
  averageSalary: number;
}

export default function DashboardPage() {
  const navigate = useNavigate();

  const [summary, setSummary] =
    useState<PayrollSummary | null>(null);

  const [topEmployees, setTopEmployees] =
    useState<TopEmployee[]>([]);

  const [departments, setDepartments] =
    useState<DepartmentBreakdown[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        summaryResponse,
        topEmployeeResponse,
        departmentResponse,
      ] = await Promise.all([
        api.get(
          "/analytics/payroll-summary"
        ),

        api.get(
          "/analytics/highest-paid-employees"
        ),

        api.get(
          "/analytics/department-breakdown"
        ),
      ]);

      setSummary(
        summaryResponse.data
      );

      setTopEmployees(
        topEmployeeResponse.data
      );

      setDepartments(
        departmentResponse.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
        >
          HR Dashboard
        </Typography>

        <Box
          display="flex"
          gap={2}
        >
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                "/employees"
              )
            }
          >
            Employees
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={
              handleLogout
            }
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        mb={4}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>
                Total Employees
              </Typography>

              <Typography variant="h5">
                {summary?.employeeCount ??
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>
                Employees With Salary
              </Typography>

              <Typography variant="h5">
                {summary?.employeesWithSalary ??
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>
                Total Payroll
              </Typography>

              <Typography variant="h5">
                ₹
                {summary?.totalPayroll?.toLocaleString() ??
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>
                Average Salary
              </Typography>

              <Typography variant="h5">
                ₹
                {summary?.averageSalary?.toLocaleString() ??
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Highest Paid Employees
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Employee
                  </TableCell>

                  <TableCell>
                    Department
                  </TableCell>

                  <TableCell>
                    Salary
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {topEmployees.map(
                  (
                    employee
                  ) => (
                    <TableRow
                      key={
                        employee.employeeId
                      }
                    >
                      <TableCell>
                        {
                          employee.employeeName
                        }
                      </TableCell>

                      <TableCell>
                        {
                          employee.department
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {(
                          employee.baseSalary +
                          employee.bonus
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Department Breakdown
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Department
                  </TableCell>

                  <TableCell>
                    Employees
                  </TableCell>

                  <TableCell>
                    Avg Salary
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {departments.map(
                  (
                    department
                  ) => (
                    <TableRow
                      key={
                        department.department
                      }
                    >
                      <TableCell>
                        {
                          department.department
                        }
                      </TableCell>

                      <TableCell>
                        {
                          department.employeeCount
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {department.averageSalary.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}