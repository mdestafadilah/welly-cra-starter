import React from "react";
import useSWR from "swr";
import { Typography } from "@material-ui/core";

export default (): JSX.Element => {
  const { data, error } = useSWR("/users/1");

  if (error) return <Typography variant="h1">Failed to load</Typography>;
  if (!data) return <Typography variant="h1">Page loading...</Typography>;

  return (
    <div>
      <Typography variant="h1">{data.name}</Typography>
    </div>
  );
};
