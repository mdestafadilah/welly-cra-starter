import React from "react";
import useSWR from "swr";
import { Typography } from "@material-ui/core";

export default (): JSX.Element => {
  const { data, error } = useSWR("/users/1");
  let txt = "Page loading...";

  if (error) txt = "Fail to load data";
  if (data) txt = data.name;

  return (
    <div>
      <Typography variant="h1">{txt}</Typography>
    </div>
  );
};
