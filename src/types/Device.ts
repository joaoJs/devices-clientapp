export enum DeviceType {
  WINDOWS_WORKSTATION = "WINDOWS WORKSTATION",
  WINDOWS_SERVER = "WINDOWS SERVER",
  MAC = "MAC",
}

export type Device = {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: number;
};
