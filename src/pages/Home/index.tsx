import React from "react";
import useSWR from "swr";
import { Typography } from "@material-ui/core";

export default (): JSX.Element => {
  const { error, data } = useSWR("/users/1", { suspense: true });

  return (
    <div>
      <Typography variant="h1">
        {error ? "Fail to load data" : data.name}
      </Typography>
    </div>
  );
};
