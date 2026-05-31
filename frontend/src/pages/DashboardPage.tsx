import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/api";

interface PayrollSummary {
  employeeCount: number;
  employeesWithSalary: number;
  totalPayroll: number;
  averageSalary: number;
}

export default function DashboardPage() {
  const [summary, setSummary] =
    useState<PayrollSummary | null>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const response =
        await api.get(
          "/analytics/payroll-summary"
        );

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        gutterBottom
      >
        HR Dashboard
      </Typography>

      <Grid container spacing={2}>
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
    </Box>
  );
}