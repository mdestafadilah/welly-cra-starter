/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";

import { useAuth, ContextPros } from "../../context/auth";
import { container, btn } from "./styles";

interface LocationState {
  from: {
    pathname: string;
  };
}

export default (): JSX.Element => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { isAuthenticated, login } = useAuth() as ContextPros;

  const handleLogin = (): void => {
    login(() => {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    });
  };

  return !isAuthenticated ? (
    <Container css={container} maxWidth={false}>
      <Typography variant="h6">Please login</Typography>
      <Button
        css={btn}
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button
        css={btn}
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
      >
        Cancel
      </Button>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};
