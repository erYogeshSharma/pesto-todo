import { green, grey, orange, red, teal, yellow } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

export const inter = `"Sora", sans-serif`;
export const ojuju = `"Ojuju", sans-serif`;

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    txt12: true;
  }
}

type mode = "light" | "dark";
const primary = orange;
const secondary = teal;

const getTheme = (mode: mode): ThemeOptions => ({
  typography: {
    fontSize: 16,
    htmlFontSize: 10,
    fontFamily: inter,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: mode === "dark" ? primary[700] : primary[200],
            "&:hover": {
              backgroundColor: mode === "dark" ? primary[500] : primary[100],
            },
          },
        },
      },
    },
  },
  palette: {
    mode: mode,
    primary: {
      ...primary,
      main: mode === "light" ? primary[500] : primary[300],
      contrastText: mode === "light" ? "#fff" : grey[900],
    },
    secondary: secondary,

    background: {
      default: mode === "light" ? primary[50] : grey[900],
      paper: mode === "light" ? "#fff" : grey[800],
    },
    success: {
      main: mode === "light" ? green[500] : green[300],
      contrastText: mode === "light" ? "#fff" : grey[900],
    },
    error: {
      main: mode === "light" ? red[500] : red[200],
    },
    warning: {
      main: mode === "light" ? yellow[500] : yellow[300],
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default getTheme;
