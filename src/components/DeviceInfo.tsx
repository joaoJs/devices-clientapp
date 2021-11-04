import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Device } from '../types/Device';


interface IProps {
    device: Device
}

const DeviceInfo: React.FC<IProps> = ({ device }) => {

    // const getDeviceType

    return (
        <>
            <ListItem >
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
            </ListItem>
            <Divider />
        </>
    )
}

export default DeviceInfo;