import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import DeviceForm from './DeviceForm';
import { Device } from '../types/Device';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    device: Device,
    onDelete: (isDeleted: boolean) => void
}

const DeviceInfo: React.FC<IProps> = ({ device, onDelete }) => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleModalOpen = () => setEditModalOpen(true);
    const handleModalClose = () => setEditModalOpen(false);

    const deleteDevice = (event: any) => {
        fetch(`http://localhost:3001/devices/${device.id}`, { method: 'DELETE' })
            .then((data) => onDelete(true));
    }
    
    const editDevice = () => {
        handleModalOpen()
    }

    return (
        <>
            <Modal
                open={editModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DeviceForm device={device} onModalClose={handleModalClose}/>
                </Box>
            </Modal>
            <ListItem 
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteDevice}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemText 
                    primary={device.system_name}
                    secondary={(
                        <>
                            <p>{device.type}</p>
                            <p>{`${device.hdd_capacity} GB`}</p>
                        </>
                    )}
                    >
                </ListItemText>
                <IconButton edge="end" aria-label="delete" onClick={editDevice}>
                    <EditIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default DeviceInfo;