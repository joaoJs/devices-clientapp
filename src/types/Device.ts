export enum DeviceType {
   windowsWorkstation = 'Windows Workstation',
   windowsServer = 'Windows Server',
   mac = "Mac"
}

export type Device = {
    id: string;
    systemName: string;
    type: string;
    hddCapacity: number;
}


//   let c: Color = Color.Green;