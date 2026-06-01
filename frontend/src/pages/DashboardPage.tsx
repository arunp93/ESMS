import {
  Box,
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
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import {
  PeopleAltRounded as PeopleIcon,
  CheckCircleOutlineRounded as VerifiedIcon,
  PaymentsRounded as PayrollIcon,
  TrendingUpRounded as AvgSalaryIcon,
  EmojiEventsRounded as TrophyIcon,
  CorporateFareRounded as DeptIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

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
  const [summary, setSummary] = useState<PayrollSummary | null>(null);
  const [topEmployees, setTopEmployees] = useState<TopEmployee[]>([]);
  const [departments, setDepartments] = useState<DepartmentBreakdown[]>([]);

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
        api.get("/analytics/payroll-summary"),
        api.get("/analytics/highest-paid-employees"),
        api.get("/analytics/department-breakdown"),
      ]);

      setSummary(summaryResponse.data);
      setTopEmployees(topEmployeeResponse.data);
      setDepartments(departmentResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const maxAvgSalary = Math.max(...departments.map((d) => d.averageSalary), 1);
  const maxEmployeeCount = Math.max(...departments.map((d) => d.employeeCount), 1);

  return (
    <Box>
      {/* Welcome & Header info */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
          Welcome back, Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is the latest payroll analytics and department insights.
        </Typography>
      </Box>

      {/* Analytics Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 20px -10px rgba(79, 70, 229, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  TOTAL EMPLOYEES
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(79, 70, 229, 0.08)", color: "primary.main", width: 44, height: 44 }}>
                  <PeopleIcon />
                </Avatar>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                {summary?.employeeCount ?? 0}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Registered employees in database
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 20px -10px rgba(14, 165, 233, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  ACTIVE PAYSLIPS
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(14, 165, 233, 0.08)", color: "secondary.main", width: 44, height: 44 }}>
                  <VerifiedIcon />
                </Avatar>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                {summary?.employeesWithSalary ?? 0}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Employees with assigned salary structure
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 20px -10px rgba(16, 185, 129, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  TOTAL PAYROLL
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(16, 185, 129, 0.08)", color: "success.main", width: 44, height: 44 }}>
                  <PayrollIcon />
                </Avatar>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                ₹{summary?.totalPayroll?.toLocaleString() ?? 0}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Monthly salary expenditure budget
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 20px -10px rgba(245, 158, 11, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  AVERAGE SALARY
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(245, 158, 11, 0.08)", color: "warning.main", width: 44, height: 44 }}>
                  <AvgSalaryIcon />
                </Avatar>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                ₹{summary?.averageSalary?.toLocaleString() ?? 0}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Average pay package per employee
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables and Breakdowns */}
      <Grid container spacing={4}>
        {/* Highest Paid Employees Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={1} sx={{ p: 0, overflow: "hidden" }}>
            <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "primary.main", color: "white", width: 36, height: 36 }}>
                <TrophyIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Highest Paid Employees
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Top earners based on current salary + bonus
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell align="right">Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topEmployees.map((employee) => (
                  <TableRow key={employee.employeeId} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            bgcolor: "rgba(0,0,0,0.05)",
                            color: "text.primary",
                          }}
                        >
                          {employee.employeeName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {employee.employeeName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.employeeCode}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.department}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
                        ₹{(employee.baseSalary + employee.bonus).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Department Breakdown Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={1} sx={{ p: 0, overflow: "hidden" }}>
            <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "secondary.main", color: "white", width: 36, height: 36 }}>
                <DeptIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Department Breakdown
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Distribution of headcount and average pay packages
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell align="right">Avg Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.department} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {department.department}
                      </Typography>
                      {/* Interactive Visual Bar */}
                      <Box sx={{ width: "100%", mt: 0.8 }}>
                        <Box
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                            overflow: "hidden",
                            maxWidth: 160,
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${(department.averageSalary / maxAvgSalary) * 100}%`,
                              borderRadius: 3,
                              background: "linear-gradient(90deg, #4f46e5 0%, #0ea5e9 100%)",
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {department.employeeCount}
                        </Typography>
                        <Box
                          sx={{
                            height: 4,
                            width: 32,
                            borderRadius: 2,
                            bgcolor: "rgba(0,0,0,0.04)",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${(department.employeeCount / maxEmployeeCount) * 100}%`,
                              bgcolor: "secondary.main",
                            }}
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
                        ₹{department.averageSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}