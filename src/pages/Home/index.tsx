/** @jsx jsx */

import { jsx } from "@emotion/core";
import useSWR from "swr";
import { Container, Typography } from "@material-ui/core";

import { container } from "./styles";

export default (): JSX.Element => {
  const { error, data } = useSWR("/posts/1", { suspense: true });

  return (
    <Container maxWidth={false} css={container}>
      <Typography variant="h6">
        {error ? "Fail to load data" : data.title}
      </Typography>
      {!error && <Typography>{data.body}</Typography>}
    </Container>
  );
};
