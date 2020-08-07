/** @jsx jsx */

import { jsx } from "@emotion/core";
import { memo } from "react";
import { Container, Typography } from "@material-ui/core";

import { container } from "./styles";

const Protected = (): JSX.Element => (
  <Container css={container} maxWidth={false}>
    <Typography variant="h6">This is protected page</Typography>
  </Container>
);

export default memo(Protected);
