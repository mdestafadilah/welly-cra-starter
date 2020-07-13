import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          color: "#fff",
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
