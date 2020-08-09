/** @jsx jsx */

import { jsx } from "@emotion/core";
import { memo } from "react";
import { Container, Typography } from "@material-ui/core";

import useAtuhSWR from "../../hooks/useAuthSWR";
import { Loading } from "../../components";
import { container, post } from "./styles";

interface Data {
  id: number;
  title: string;
  body: string;
}

const Home = (): JSX.Element => {
  const { error, data } = useAtuhSWR("/posts123");

  const renderContent = (): JSX.Element | JSX.Element[] => {
    if (error)
      return <Typography variant="h6">Oops! Fail to load posts.</Typography>;
    if (!data) return <Loading />;

    return data.map(({ id, title, body }: Data) => (
      <div key={id} css={post}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{body}</Typography>
      </div>
    ));
  };

  return (
    <Container maxWidth={false} css={container}>
      {renderContent()}
    </Container>
  );
};

export default memo(Home);
