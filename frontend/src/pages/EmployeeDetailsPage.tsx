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
  Grid,
  Avatar,
  Stack,
  Divider,
  Chip,
  InputAdornment,
  Card,
} from "@mui/material";
import {
  ArrowBackRounded as BackIcon,
  BadgeRounded as BadgeIcon,
  EmailRounded as EmailIcon,
  CorporateFareRounded as DeptIcon,
  WorkRounded as DesignationIcon,
  AccountBalanceWalletRounded as SalaryIcon,
  ArrowUpwardRounded as IncreaseIcon,
  ArrowDownwardRounded as DecreaseIcon,
  CheckCircleRounded as ActiveIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [employeeResponse, historyResponse] = await Promise.all([
        api.get(`/employees/${id}`),
        api.get(`/employees/${id}/salary-history`),
      ]);
      setEmployee(employeeResponse.data);
      setSalaryHistory(historyResponse.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSalary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseSalary || isNaN(Number(baseSalary))) {
      setError("Please enter a valid base salary amount");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setSubmitting(true);

      await api.put(`/employees/${id}/salary`, {
        baseSalary: Number(baseSalary),
        bonus: bonus ? Number(bonus) : 0,
        effectiveDate: new Date(),
      });

      setSuccess("Salary package updated successfully");
      setBaseSalary("");
      setBonus("");
      await loadData();
    } catch (err) {
      setError("Failed to update salary package");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getSalaryChangeText = (oldBase: number, newBase: number) => {
    if (oldBase === 0) return null;
    const diff = newBase - oldBase;
    const percentage = ((diff / oldBase) * 100).toFixed(1);
    const isPositive = diff > 0;

    return (
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: isPositive ? "success.main" : "error.main" }}>
        {isPositive ? <IncreaseIcon sx={{ fontSize: 14 }} /> : <DecreaseIcon sx={{ fontSize: 14 }} />}
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {isPositive ? "+" : ""}{percentage}%
        </Typography>
      </Stack>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 15 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Top Header Panel */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={() => navigate("/employees")}
        >
          Back to List
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Left Column: Profile Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          {employee && (
            <Card sx={{ p: 4, textAlign: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: "2rem",
                    fontWeight: 700,
                    bgcolor: "primary.main",
                    color: "white",
                    mb: 2,
                    boxShadow: "0 8px 24px rgba(79, 70, 229, 0.15)",
                  }}
                >
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
                  {employee.firstName} {employee.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {employee.designation}
                </Typography>
                <Chip
                  icon={<ActiveIcon sx={{ fontSize: "14px !important" }} />}
                  label={employee.status}
                  size="small"
                  color="success"
                  sx={{
                    mt: 1.5,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: "6px",
                    bgcolor: "rgba(16, 185, 129, 0.12)",
                    color: "success.dark",
                  }}
                />
              </Box>

              <Divider sx={{ my: 2.5 }} />

              <Stack spacing={2} sx={{ textAlign: "left" }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(0,0,0,0.03)", color: "text.secondary" }}>
                    <BadgeIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Employee Code
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {employee.employeeCode}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(0,0,0,0.03)", color: "text.secondary" }}>
                    <EmailIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Box sx={{ overflow: "hidden" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                      {employee.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(0,0,0,0.03)", color: "text.secondary" }}>
                    <DeptIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Department
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {employee.department}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(0,0,0,0.03)", color: "text.secondary" }}>
                    <DesignationIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Designation
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {employee.designation}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          )}
        </Grid>

        {/* Right Column: Update form & Salary History */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {/* Update Salary Panel */}
            <Paper component="form" onSubmit={updateSalary} sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
                Adjust Compensation Structure
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Set the new base salary and optional performance bonus for this employee.
              </Typography>

              <Grid container spacing={3} sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <TextField
                    fullWidth
                    label="Base Salary"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    disabled={submitting}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="text.secondary">₹</Typography>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Performance Bonus"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    disabled={submitting}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="text.secondary">₹</Typography>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    sx={{ height: 40 }}
                  >
                    {submitting ? "Updating..." : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Salary History Panel */}
            <Paper sx={{ p: 0, overflow: "hidden" }}>
              <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "success.main", color: "white", width: 36, height: 36 }}>
                  <SalaryIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                    Compensation History
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Chronological audit of salary adjustments and changes
                  </Typography>
                </Box>
              </Box>
              <Divider />

              {salaryHistory.length === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    No salary adjustment history found.
                  </Typography>
                </Box>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Adjustment Date</TableCell>
                      <TableCell align="right">Old Salary</TableCell>
                      <TableCell align="right">New Salary</TableCell>
                      <TableCell align="right">Bonus Change</TableCell>
                      <TableCell align="right">Growth Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salaryHistory.map((history) => (
                      <TableRow key={history.id} sx={{ "&:last-child td": { border: 0 } }}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {new Date(history.effectiveDate).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="text.secondary">
                            ₹{history.oldBaseSalary.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
                            ₹{history.newBaseSalary.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="text.secondary">
                            ₹{history.oldBonus.toLocaleString()} → ₹{history.newBonus.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            {getSalaryChangeText(history.oldBaseSalary, history.newBaseSalary) ?? (
                              <Typography variant="caption" color="text.secondary">
                                —
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}