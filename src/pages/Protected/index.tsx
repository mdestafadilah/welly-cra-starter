/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Container, Typography } from "@material-ui/core";

import { container } from "./styles";

export default (): JSX.Element => (
  <Container css={container} maxWidth={false}>
    <Typography variant="h6">This is protected page</Typography>
  </Container>
);
