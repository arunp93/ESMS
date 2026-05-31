import {
  Box,
  Button,
  CircularProgress,
  Pagination,
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
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function EmployeesPage() {
  const navigate =
    useNavigate();

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState<PaginationData>({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    });

  const loadEmployees =
    async (
      pageNumber = page
    ) => {
      try {
        setLoading(true);

        const response =
          await api.get(
            `/employees?page=${pageNumber}&limit=20&search=${search}`
          );

        setEmployees(
          response.data.data
        );

        setPagination(
          response.data.pagination
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadEmployees(1);
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);

    loadEmployees(value);
  };

  const handleSearch = () => {
    setPage(1);

    loadEmployees(1);
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Employees
        </Typography>

        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          Dashboard
        </Button>
      </Box>

      <Typography
        variant="body1"
        mb={2}
      >
        Total Employees:
        {" "}
        {pagination.total.toLocaleString()}
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={3}
      >
        <TextField
          label="Search Employee"
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
            handleSearch
          }
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          mt={5}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading &&
        employees.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign:
                "center",
            }}
          >
            No employees found.
          </Paper>
        )}

      {!loading &&
        employees.length > 0 && (
          <>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Employee Code
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
                        hover
                        sx={{
                          cursor:
                            "pointer",
                        }}
                        onClick={() =>
                          navigate(
                            `/employees/${employee.id}`
                          )
                        }
                      >
                        <TableCell>
                          {
                            employee.employeeCode
                          }
                        </TableCell>

                        <TableCell>
                          {
                            employee.firstName
                          }{" "}
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

            <Box
              display="flex"
              justifyContent="center"
              mt={3}
            >
              <Pagination
                page={page}
                count={
                  pagination.totalPages
                }
                onChange={
                  handlePageChange
                }
                color="primary"
              />
            </Box>
          </>
        )}
    </Box>
  );
}