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
  InputAdornment,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import {
  SearchRounded as SearchIcon,
  PeopleOutlineRounded as PeopleIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const getDepartmentColor = (dept: string): "primary" | "secondary" | "success" | "warning" | "default" => {
  const normalized = dept.toLowerCase();
  if (normalized.includes("eng") || normalized.includes("tech")) return "primary";
  if (normalized.includes("hr") || normalized.includes("people")) return "secondary";
  if (normalized.includes("sale") || normalized.includes("market")) return "warning";
  if (normalized.includes("fin") || normalized.includes("ops")) return "success";
  return "default";
};

export default function EmployeesPage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const loadEmployees = async (pageNumber = page) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/employees?page=${pageNumber}&limit=20&search=${search}`
      );
      setEmployees(response.data.data);
      setPagination(response.data.pagination);
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadEmployees(1);
  };

  return (
    <Box>
      {/* Page Header summary info */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            A comprehensive list of all active employee profiles
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total count: {pagination.total.toLocaleString()} employees
          </Typography>
        </Box>

        {/* Search Command Box */}
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <TextField
            placeholder="Search code, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 260 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
          <CircularProgress size={44} thickness={4} />
        </Box>
      ) : employees.length === 0 ? (
        <Paper
          elevation={1}
          sx={{
            py: 8,
            px: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "rgba(0,0,0,0.04)", color: "text.secondary", width: 56, height: 56 }}>
            <PeopleIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              No employees found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or clear the query.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <>
          <Paper elevation={1} sx={{ overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Employee Code</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Designation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    hover
                    onClick={() => navigate(`/employees/${employee.id}`)}
                    sx={{
                      cursor: "pointer",
                      "&:last-child td": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                          }}
                        >
                          {employee.firstName.charAt(0)}
                          {employee.lastName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {employee.firstName} {employee.lastName}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace", letterSpacing: 0.5 }}>
                        {employee.employeeCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                       <Chip
                        label={employee.department}
                        size="small"
                        color={getDepartmentColor(employee.department)}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          borderRadius: "6px",
                          bgcolor: (theme) => {
                            const c = getDepartmentColor(employee.department);
                            if (c === "default") return "rgba(0,0,0,0.06)";
                            return `rgba(${theme.palette[c].main === "#4f46e5" ? "79,70,229" : theme.palette[c].main === "#0ea5e9" ? "14,165,233" : theme.palette[c].main === "#10b981" ? "16,185,129" : "245,158,11"}, 0.12)`;
                          },
                          color: (_theme) => {
                            const c = getDepartmentColor(employee.department);
                            if (c === "default") return "text.primary";
                            return `${c}.dark`;
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.designation}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Styled Pagination Controls */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                page={page}
                count={pagination.totalPages}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}