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
    width: '32px',
    alignSelf: 'end'
}

const submitBtnStyles = {
    width: '32px',
    alignSelf: 'center',
    color: 'green'
}

const inputStyles = {
    margin: '16px'
}

interface IFormProps {
  device: Device;
  onModalClose: () => void;
  onEditDevice?: (data: Device) => void;
}

const DeviceForm: FC<IFormProps> = ({ device, onModalClose, onEditDevice }: IFormProps) => {
  const { handleSubmit, control, formState } = useForm();
  const [result, setResult] = useState("");

  const onSubmit = (data: Device) => {
    console.log(data);
    if (onEditDevice) {
        console.log(data)
        onEditDevice(data)
    } else {

    }
    onModalClose();
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
        name={"system_name"}
        control={control}
        defaultValue={onEditDevice ? device.system_name : ''}
        render={({ field: { onChange, value } }) => (
          <TextField style={inputStyles} onChange={onChange} value={value} label={"System name"} />
        )}
      />
      <Controller
        name={"hdd_capacity"}
        defaultValue={onEditDevice ? device.hdd_capacity : ''}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField type="number" style={inputStyles} onChange={onChange} value={value} label={"hdd capacity"} />
        )}
      />
      <Controller
        name={"type"}
        defaultValue={onEditDevice ? device.type : ''}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select style={inputStyles} onChange={onChange} value={value}>
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
