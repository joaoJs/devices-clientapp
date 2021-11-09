import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Device, DeviceType } from "../types/Device";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

const formStyles = {
  display: "flex" as "flex",
  flexDirection: "column" as "column",
};

const closeBtnStyles = {
  width: "32px",
  alignSelf: "end",
};

const inputStyles = {
  margin: "16px",
};

interface IFormProps {
  device?: Device;
  onModalClose: () => void;
  onEditDevice?: (data: Device) => void;
  onAddDevice?: (data: Device) => void;
}

const DeviceForm: FC<IFormProps> = ({
  device,
  onModalClose,
  onEditDevice,
  onAddDevice,
}: IFormProps) => {
  const { handleSubmit, control, formState } = useForm({mode: 'onChange'});

  const onSubmit = (data: Device) => {
    if (onEditDevice) {
      onEditDevice(data);
    } else if (onAddDevice) {
      onAddDevice(data);
    }
    onModalClose();
  };

  const getDeviceTypes = () =>
    Object.keys(DeviceType).map((dvcType) => (
      <MenuItem key={`${device?.id}-dvcType-edit` || dvcType} value={dvcType}>
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
        defaultValue={device?.system_name || ""}
        rules={{required: true}}
        render={({ field: { onChange, value } }) => (
          <TextField
            style={inputStyles}
            onChange={onChange}
            value={value}
            label={"System name"}
          />
        )}
      />
      <Controller
        name={"hdd_capacity"}
        defaultValue={device?.hdd_capacity || ""}
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, value } }) => (
          <TextField
            type="number"
            style={inputStyles}
            onChange={onChange}
            value={value}
            label={"hdd capacity"}
          />
        )}
      />
      <Controller
        name={"type"}
        defaultValue={device?.type || ""}
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, value } }) => (
          <>
            <Select style={inputStyles} onChange={onChange} value={value}>
              {getDeviceTypes()}
            </Select>
          </>
        )}
      />

      <Button
        variant="outlined"
        color="success"
        disabled={!formState.isValid}
        style={{ ...inputStyles, height: "56px" }}
        endIcon={<CheckCircleOutlineIcon />}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default DeviceForm;
