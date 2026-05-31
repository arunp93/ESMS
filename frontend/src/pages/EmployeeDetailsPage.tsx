import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

interface SalaryHistory {
  id: number;
  oldBaseSalary: number;
  newBaseSalary: number;
  oldBonus: number;
  newBonus: number;
  createdAt: string;
}

export default function EmployeeDetailsPage() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState<Employee | null>(null);

  const [salaryHistory, setSalaryHistory] =
    useState<SalaryHistory[]>([]);

  const [baseSalary, setBaseSalary] =
    useState("");

  const [bonus, setBonus] =
    useState("");

  useEffect(() => {
    loadEmployee();
    loadSalaryHistory();
  }, []);

  const loadEmployee = async () => {
    const response =
      await api.get(
        `/employees/${id}`
      );

    setEmployee(
      response.data
    );
  };

  const loadSalaryHistory =
    async () => {
      const response =
        await api.get(
          `/employees/${id}/salary-history`
        );

      setSalaryHistory(
        response.data
      );
    };

  const updateSalary =
    async () => {
      await api.put(
        `/employees/${id}/salary`,
        {
          baseSalary:
            Number(
              baseSalary
            ),

          bonus:
            Number(
              bonus
            ),

          effectiveDate:
            new Date(),
        }
      );

      alert(
        "Salary updated"
      );

      loadSalaryHistory();
    };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Employee Details
      </Typography>

      {employee && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
          }}
        >
          <Typography>
            Name:
            {" "}
            {
              employee.firstName
            }
            {" "}
            {
              employee.lastName
            }
          </Typography>

          <Typography>
            Employee Code:
            {" "}
            {
              employee.employeeCode
            }
          </Typography>

          <Typography>
            Email:
            {" "}
            {
              employee.email
            }
          </Typography>

          <Typography>
            Department:
            {" "}
            {
              employee.department
            }
          </Typography>

          <Typography>
            Designation:
            {" "}
            {
              employee.designation
            }
          </Typography>
        </Paper>
      )}

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Update Salary
        </Typography>

        <TextField
          label="Base Salary"
          value={baseSalary}
          onChange={(e) =>
            setBaseSalary(
              e.target.value
            )
          }
          sx={{
            mr: 2,
          }}
        />

        <TextField
          label="Bonus"
          value={bonus}
          onChange={(e) =>
            setBonus(
              e.target.value
            )
          }
          sx={{
            mr: 2,
          }}
        />

        <Button
          variant="contained"
          onClick={
            updateSalary
          }
        >
          Update
        </Button>
      </Paper>

      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Salary History
        </Typography>

        <Table>
          <TableBody>
            {salaryHistory.map(
              (
                history
              ) => (
                <TableRow
                  key={
                    history.id
                  }
                >
                  <TableCell>
                    ₹
                    {
                      history.oldBaseSalary
                    }
                  </TableCell>

                  <TableCell>
                    →
                  </TableCell>

                  <TableCell>
                    ₹
                    {
                      history.newBaseSalary
                    }
                  </TableCell>

                  <TableCell>
                    {new Date(
                      history.createdAt
                    ).toLocaleDateString()}
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