import List from '@mui/material/List';
import DeviceInfo from './DeviceInfo';
import { Device } from '../types/Device';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MainView: React.FC = () => {

    const { data, error } = useSWR('http://localhost:3001/devices', fetcher, {
        // onSuccess: (data) => {
        //     console.log(data);
        // }
    });

    if(error) {
        return <h1>error</h1>
    }

    console.log(data);

    const renderList = () => data?.map((device: Device) => {
        return <DeviceInfo device={device}></DeviceInfo>
    })

    return (
        <List>
            {renderList()}
        </List>
    )
}

export default MainView;