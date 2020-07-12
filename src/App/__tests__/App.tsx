import React from "react";

import { render } from "@testing-library/react";
import App from "..";

it("renders Home link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Home");
  expect(linkElement).toBeInTheDocument();
});
