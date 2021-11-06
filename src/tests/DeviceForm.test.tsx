import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DeviceForm from "../components/DeviceForm";
import { mockDevice, callbackMock } from './utils';

beforeEach(() => {
  jest.spyOn(global, "fetch").mockReturnValue(
    new Promise<Response>((r) => setTimeout(r, 0))
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders component with submit button",async () => {
  render(<DeviceForm device={mockDevice} onModalClose={callbackMock} />);
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

test("renders component with mock device's type",async () => {
    render(<DeviceForm device={mockDevice} onModalClose={callbackMock} />);
    expect(screen.getByText(mockDevice.type)).toBeInTheDocument();
  });

// test("calls onMutation on update", async () => {
//   render(<DeviceForm device={mockDevice} onMutation={onMutationMock} />);
//   const deleteBtn = screen.getByTestId("deleteBtn");
//   fireEvent.click(deleteBtn);
//   await new Promise((r) => setTimeout(r, 0));
//   expect(onMutationMock).toHaveBeenCalled();
// });
