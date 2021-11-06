import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DeviceForm from "../components/DeviceForm";
import { mockDevice, callbackMock } from "./utils";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockReturnValue(
    new Promise<Response>((r) => setTimeout(r, 0))
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders component with submit button", async () => {
  render(<DeviceForm device={mockDevice} onModalClose={callbackMock} />);
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

test("renders component with mock device's type", async () => {
  render(<DeviceForm device={mockDevice} onModalClose={callbackMock} />);
  expect(screen.getByText(mockDevice.type)).toBeInTheDocument();
});

test("calls callback on submit", async () => {
  render(<DeviceForm device={mockDevice} onModalClose={callbackMock} />);
  const submitBtn = screen.getByText(/Submit/i);
  await act(async () => {
    await fireEvent.click(submitBtn);
  });
  expect(callbackMock).toHaveBeenCalled();
});

test("calls callback on edit", async () => {
  render(
    <DeviceForm
      device={mockDevice}
      onModalClose={() => {}}
      onEditDevice={callbackMock}
    />
  );
  const submitBtn = screen.getByText(/Submit/i);
  await act(async () => {
    await fireEvent.click(submitBtn);
  });
  expect(callbackMock).toHaveBeenCalled();
});

test("calls callback on add", async () => {
  render(
    <DeviceForm
      device={mockDevice}
      onModalClose={() => {}}
      onAddDevice={callbackMock}
    />
  );
  const submitBtn = screen.getByText(/Submit/i);
  await act(async () => {
    await fireEvent.click(submitBtn);
  });
  expect(callbackMock).toHaveBeenCalled();
});
