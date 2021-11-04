import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

const mainTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#01dd24",
      darker: "#5db075",
      contrastText: "#fff",
    },
    neutral: {
      main: "#01dd24",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5db075",
    },
    error: {
      main: "#D04545",
    },
  },
});

export { mainTheme };
