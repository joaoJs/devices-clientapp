export enum DeviceType {
    WINDOWS_WORKSTATION = 'Windows Workstation',
    WINDOWS_SERVER = 'Windows Server',
    MAC = "Mac"
}

export type Device = {
    id: string;
    system_name: string;
    type: string;
    hdd_capacity: number;
}
