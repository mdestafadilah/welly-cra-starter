/** @jsx jsx */

import { jsx } from "@emotion/core";
import { memo } from "react";
import { Container, Typography } from "@material-ui/core";

import { container } from "./styles";

const NoMatch = (): JSX.Element => (
  <Container css={container} maxWidth={false}>
    <Typography variant="h6">Pages doesn&apos;t exist</Typography>
  </Container>
);

export default memo(NoMatch);
