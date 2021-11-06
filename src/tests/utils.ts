import { Device, DeviceType } from "../types/Device";

export const mockDevice: Device = {
  id: "test",
  system_name: "test-system-name",
  hdd_capacity: 256,
  type: DeviceType.MAC,
};

export const callbackMock = jest.fn();
