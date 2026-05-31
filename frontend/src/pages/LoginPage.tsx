import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          width: 400,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          mb={3}
        >
          ESMS Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}