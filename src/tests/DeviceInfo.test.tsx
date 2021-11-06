import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DeviceInfo from "../components/DeviceInfo";
import { mockDevice, callbackMock } from './utils';

beforeEach(() => {
  jest.spyOn(global, "fetch").mockReturnValue(
    new Promise<Response>((r) => setTimeout(r, 0))
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders system name, type and hdd capacity", () => {
  render(<DeviceInfo device={mockDevice} onMutation={callbackMock} />);
  const expectedCapacity = `${mockDevice.hdd_capacity} GB`;
  expect(screen.getByText(mockDevice.system_name)).toBeInTheDocument();
  expect(screen.getByText(mockDevice.type)).toBeInTheDocument();
  expect(screen.getByText(expectedCapacity)).toBeInTheDocument();
});

test("calls onMutation callback on delete", async () => {
  render(<DeviceInfo device={mockDevice} onMutation={callbackMock} />);
  const deleteBtn = screen.getByTestId("deleteBtn");
  fireEvent.click(deleteBtn);
  await new Promise((r) => setTimeout(r, 0));
  expect(callbackMock).toHaveBeenCalled();
});
