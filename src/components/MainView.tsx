import React, { useState } from "react";
import List from "@mui/material/List";
import DeviceInfo from "./DeviceInfo";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Device, DeviceType } from "../types/Device";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../utils/helperFunctions";
import { BASE_URL } from "../utils/constants";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeviceForm from "./DeviceForm";
import { useMediaQuery } from "@material-ui/core";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MainView: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleModalOpen = () => setAddModalOpen(true);
  const handleModalClose = () => setAddModalOpen(false);
  const [devicesList, setDevicesList] = useState<Device[]>([]);
  const [deviceType, setDeviceType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const matches = useMediaQuery(`(min-width:800px)`);

  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(BASE_URL, fetcher, {
    onSuccess: (res: Device[]) => {
      setDevicesList(res);
    },
  });

  const handleDeviceTypeChange = (event: any) => {
    setDeviceType(event.target.value);
  };

  const handleSortBy = (event: any) => {
    setSortBy(event.target.value);
  };

  if (error) {
    // TODO: add error handling
    return <h1>error</h1>;
  }

  if (!data) {
    // TODO: handle loading state
    return <div>loading...</div>;
  }

  const handleMutation = (isMutated: boolean) => {
    if (isMutated) {
      mutate(BASE_URL);
    }
  };

  const addDevice = (data: Device) => {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleMutation(true));
  };

  const renderDevicesList = () => {
    return devicesList
      ?.filter((dvc: Device) => {
        return deviceType.length && deviceType !== "All"
          ? dvc.type === deviceType
          : dvc;
      })
      .sort((a: Device, b: Device) => {
        if (sortBy.length) {
          if (sortBy === "hdd_capacity") {
            return a.hdd_capacity - b.hdd_capacity;
          } else {
            return a.system_name.charCodeAt(0) - b.system_name.charCodeAt(0);
          }
        } else {
          return 0;
        }
      })
      .map((device: Device) => {
        return (
          <DeviceInfo
            key={`${device.id}-mainView`}
            device={device}
            onMutation={handleMutation}
          ></DeviceInfo>
        );
      });
  };

  const getDeviceTypes = () =>
    Object.keys(DeviceType)
      .concat(["All"])
      .map((dvcType) => (
        <MenuItem key={`${dvcType}-mainView`} value={dvcType}>
          {dvcType}
        </MenuItem>
      ));

  const getSortByOptions = () =>
    ["hdd_capacity", "system_name"].map((dvcProp) => (
      <MenuItem key={`${dvcProp}-mainView`} value={dvcProp}>
        {dvcProp}
      </MenuItem>
    ));

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={matches ? "800px" : "100%"}
      margin="20px auto"
    >
      <Modal
        open={addModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DeviceForm onModalClose={handleModalClose} onAddDevice={addDevice} />
        </Box>
      </Modal>
      <Typography
        variant="h1"
        fontSize="48px"
        textAlign="center"
        marginBottom="24px"
      >
        Devices
      </Typography>
      <Box>
        <FormControl style={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-label">Device type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deviceType}
            label="Device type"
            onChange={handleDeviceTypeChange}
          >
            {getDeviceTypes()}
          </Select>
        </FormControl>
        <FormControl style={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            label="Sort by"
            onChange={handleSortBy}
          >
            {getSortByOptions()}
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        style={{ width: "200px", marginTop: "16px", alignSelf: "center" }}
        endIcon={<AddIcon />}
        onClick={handleModalOpen}
      >
        Add device
      </Button>
      <List>{renderDevicesList()}</List>
    </Box>
  );
};

export default MainView;
