import { grey, orange, teal } from "@mui/material/colors";
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
    primary: { ...primary, contrastText: "#fff" },
    secondary: secondary,

    background: {
      default: mode === "light" ? primary[50] : grey[900],
      paper: mode === "light" ? "#fff" : grey[800],
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default getTheme;
