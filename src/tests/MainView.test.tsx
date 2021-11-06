import React from "react";
import { render, screen } from "@testing-library/react";
import MainView from "../components/MainView";
import { act } from "react-dom/test-utils";

test("renders title", async () => {
  render(<MainView />);
  await act(async () => {
    await new Promise((r) => setTimeout(r, 500));
  });
  const title = screen.getByText(/Devices/i);
  expect(title).toBeInTheDocument();
});
