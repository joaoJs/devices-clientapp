import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import DeviceForm from "./DeviceForm";
import { Device } from "../types/Device";
import Box from "@mui/material/Box";
import { BASE_URL } from "../utils/constants";

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

interface IProps {
  device: Device;
  onMutation: (isMutated: boolean) => void;
}

const DeviceInfo: React.FC<IProps> = ({ device, onMutation }: IProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleModalOpen = () => setEditModalOpen(true);
  const handleModalClose = () => setEditModalOpen(false);

  const deleteDevice = (event: any) => {
    fetch(`${BASE_URL}/${device.id}`, { method: "DELETE" }).then((data) =>
      onMutation(true)
    );
  };

  const editDevice = (data: Device) => {
    fetch(`${BASE_URL}/${device.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => onMutation(true));
  };

  return (
    <>
      <Modal
        open={editModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DeviceForm
            device={device}
            onModalClose={handleModalClose}
            onEditDevice={editDevice}
          />
        </Box>
      </Modal>
      <ListItem
        secondaryAction={
          <IconButton
            color="error"
            edge="end"
            aria-label="delete"
            onClick={deleteDevice}
            data-testid="deleteBtn"
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={device.system_name}
          secondary={
            <>
              <p>{device.type}</p>
              <p>{`${device.hdd_capacity} GB`}</p>
            </>
          }
        ></ListItemText>
        <IconButton
          color="primary"
          edge="end"
          aria-label="delete"
          onClick={handleModalOpen}
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default DeviceInfo;
