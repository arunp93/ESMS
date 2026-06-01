import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo 600
      light: "#818cf8", // Indigo 400
      dark: "#3730a3", // Indigo 800
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0ea5e9", // Sky 500
      light: "#38bdf8",
      dark: "#0369a1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc", // Slate 50
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#475569", // Slate 600
    },
    success: {
      main: "#10b981", // Emerald 500
      light: "#34d399",
      dark: "#047857",
    },
    warning: {
      main: "#f59e0b", // Amber 500
      light: "#fbbf24",
      dark: "#b45309",
    },
    error: {
      main: "#ef4444", // Red 500
      light: "#f87171",
      dark: "#b91c1c",
    },
    divider: "#e2e8f0", // Slate 200
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontWeight: 700, letterSpacing: "-0.015em" },
    h5: { fontWeight: 600, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: "1rem", lineHeight: 1.6, color: "#334155" },
    body2: { fontSize: "0.875rem", lineHeight: 1.5, color: "#475569" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          boxShadow: "none",
          fontWeight: 600,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.12)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)",
              boxShadow: "0 4px 16px rgba(79, 70, 229, 0.25)",
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)",
              boxShadow: "0 4px 16px rgba(14, 165, 233, 0.25)",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderColor: "#cbd5e1",
            color: "#334155",
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#f8fafc",
              borderColor: "#94a3b8",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.02)",
          border: "1px solid #f1f5f9",
          backgroundImage: "none",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02)",
          border: "1px solid #f1f5f9",
        },
        elevation2: {
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.02), 0 6px 16px rgba(0,0,0,0.03)",
          border: "1px solid #e2e8f0",
        },
        elevation3: {
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03), 0 0 1px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #f1f5f9",
          padding: "16px 24px",
        },
        head: {
          fontWeight: 600,
          color: "#475569",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "#f8fafc",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#94a3b8",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4f46e5",
            borderWidth: "2px",
          },
        },
        notchedOutline: {
          borderColor: "#cbd5e1",
          transition: "border-color 0.15s ease-in-out",
        },
      },
    },
  },
});
