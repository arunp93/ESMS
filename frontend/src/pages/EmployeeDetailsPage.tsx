import {
  Alert,
  Box,
  Button,
  CircularProgress,
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

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../api/api";

interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  status: string;
}

interface SalaryHistory {
  id: number;
  employeeId: number;

  oldBaseSalary: number;
  newBaseSalary: number;

  oldBonus: number;
  newBonus: number;

  effectiveDate: string;
  createdAt: string;
}

export default function EmployeeDetailsPage() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [employee, setEmployee] =
    useState<Employee | null>(
      null
    );

  const [
    salaryHistory,
    setSalaryHistory,
  ] = useState<
    SalaryHistory[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [baseSalary, setBaseSalary] =
    useState("");

  const [bonus, setBonus] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        setLoading(true);

        const [
          employeeResponse,
          historyResponse,
        ] = await Promise.all([
          api.get(
            `/employees/${id}`
          ),

          api.get(
            `/employees/${id}/salary-history`
          ),
        ]);

        setEmployee(
          employeeResponse.data
        );

        setSalaryHistory(
          historyResponse.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const updateSalary =
    async () => {
      try {
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

        setSuccess(
          "Salary updated successfully"
        );

        setBaseSalary("");
        setBonus("");

        await loadData();
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          Employee Details
        </Typography>

        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              "/employees"
            )
          }
        >
          Back
        </Button>
      </Box>

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      )}

      {employee && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
          }}
        >
          <Typography>
            <strong>
              Employee Code:
            </strong>{" "}
            {
              employee.employeeCode
            }
          </Typography>

          <Typography>
            <strong>
              Name:
            </strong>{" "}
            {
              employee.firstName
            }{" "}
            {
              employee.lastName
            }
          </Typography>

          <Typography>
            <strong>
              Email:
            </strong>{" "}
            {
              employee.email
            }
          </Typography>

          <Typography>
            <strong>
              Department:
            </strong>{" "}
            {
              employee.department
            }
          </Typography>

          <Typography>
            <strong>
              Designation:
            </strong>{" "}
            {
              employee.designation
            }
          </Typography>

          <Typography>
            <strong>
              Status:
            </strong>{" "}
            {
              employee.status
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

        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
        >
          <TextField
            label="Base Salary"
            value={baseSalary}
            onChange={(e) =>
              setBaseSalary(
                e.target.value
              )
            }
          />

          <TextField
            label="Bonus"
            value={bonus}
            onChange={(e) =>
              setBonus(
                e.target.value
              )
            }
          />

          <Button
            variant="contained"
            onClick={
              updateSalary
            }
          >
            Update Salary
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Salary History
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Old Salary
              </TableCell>

              <TableCell>
                New Salary
              </TableCell>

              <TableCell>
                Old Bonus
              </TableCell>

              <TableCell>
                New Bonus
              </TableCell>

              <TableCell>
                Effective Date
              </TableCell>
            </TableRow>
          </TableHead>

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
                    {history.oldBaseSalary.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹
                    {history.newBaseSalary.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹
                    {history.oldBonus.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹
                    {history.newBonus.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      history.effectiveDate
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