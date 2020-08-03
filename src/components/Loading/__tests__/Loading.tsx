import React from "react";
import { render, screen } from "@testing-library/react";

import Loading from "..";

describe("<Loading />", () => {
  it("should render loading component", () => {
    render(<Loading />);
    expect(screen.getByRole("progressbar")).not.toBeNull();
  });
});
