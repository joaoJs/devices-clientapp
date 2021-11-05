import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Device } from '../types/Device';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IProps {
    device: Device,
    onDelete: (isDeleted: boolean) => void
}

const DeviceInfo: React.FC<IProps> = ({ device, onDelete }) => {

    const deleteDevice = (event: any) => {
        fetch(`http://localhost:3001/devices/${device.id}`, { method: 'DELETE' })
            .then((data) => onDelete(true));
    }   

    return (
        <>
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
                <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default DeviceInfo;