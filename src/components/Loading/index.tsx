/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Container, CircularProgress } from "@material-ui/core";

import { container } from "./styles";

export default (): JSX.Element => (
  <Container maxWidth={false} css={container}>
    <CircularProgress />
  </Container>
);
