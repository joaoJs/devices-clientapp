import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Device, DeviceType } from "../types/Device";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const formStyles = {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column'
}

const closeBtnStyles = {
    width: '30px',
    alignSelf: 'end'
}

const submitBtnStyles = {
    width: '30px',
    alignSelf: 'center',
    color: 'green'
}

interface IFormProps {
  device: Device;
  onModalClose: () => void;
}

const DeviceForm: FC<IFormProps> = ({ device, onModalClose }: IFormProps) => {
  const { handleSubmit, control, formState } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data: any) => {
    console.log(data);
    setResult(JSON.stringify(data));
  };

  const getDeviceTypes = () =>
    Object.keys(DeviceType).map((dvcType) => (
      <MenuItem key={`${device.id}-dvcType-edit`} value={dvcType}>
        {dvcType}
      </MenuItem>
    ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
      <IconButton 
        size="large" 
        aria-label="cancel" 
        onClick={onModalClose}
        style={closeBtnStyles}
        >
        <CloseIcon />
      </IconButton>

      <Controller
        name={"systemName"}
        control={control}
        defaultValue={device.system_name}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={"System name"} />
        )}
      />
      <Controller
        name={"hddCapacity"}
        defaultValue={device.hdd_capacity}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={"hdd capacity"} />
        )}
      />
      <Controller
        name={"deviceType"}
        defaultValue={device.type}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select onChange={onChange} value={value}>
              {getDeviceTypes()}
            </Select>
          </>
        )}
      />

      <IconButton style={submitBtnStyles} size="large" aria-label="submit" type="submit">
        <CheckCircleOutlineIcon />
      </IconButton>
    </form>
  );
};

export default DeviceForm;
