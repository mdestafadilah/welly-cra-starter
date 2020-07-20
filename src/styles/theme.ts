import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          color: "#fff",
          textDecoration: "none",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#000",
    },
    text: {
      primary: "#fff",
    },
  },
});
