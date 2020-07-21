/** @jsx jsx */

import { jsx } from "@emotion/core";
import useSWR from "swr";
import { Container, Typography } from "@material-ui/core";

import { container, post } from "./styles";

interface Data {
  id: number;
  title: string;
  body: string;
}

export default (): JSX.Element => {
  const { error, data } = useSWR("/posts", { suspense: true });

  const renderPosts = (): JSX.Element[] =>
    data.map(({ id, title, body }: Data) => (
      <div key={id} css={post}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{body}</Typography>
      </div>
    ));

  return (
    <Container maxWidth={false} css={container}>
      {error ? (
        <Typography variant="h6">Oops! Fail to load posts.</Typography>
      ) : (
        renderPosts()
      )}
    </Container>
  );
};
