import React, { useState } from 'react';
import List from '@mui/material/List';
import DeviceInfo from './DeviceInfo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Device, DeviceType } from '../types/Device';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/helperFunctions';
import { BASE_URL } from '../utils/constants';

const MainView: React.FC = () => {

    const [devicesList, setDevicesList] = useState<Device[]>([]);
    const [deviceType, setDeviceType] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');

    const { mutate } = useSWRConfig();

    const { data, error } = useSWR(BASE_URL, fetcher, {
        onSuccess: (res: Device[]) => {
            setDevicesList(res);
        }
    });

    const handleDeviceTypeChange = (event: any) => {
        setDeviceType(event.target.value);
    };

    const handleSortBy = (event: any) => {
        setSortBy(event.target.value);
    };

    if(error) {
        // TODO: add error handling
        return <h1>error</h1>
    }

    if(!data) {
        // TODO: handle loading state
        return <div>loading...</div>
    }

    const handleMutation = (isMutated: boolean) => {
        console.log(isMutated)
        if (isMutated) {
            mutate(BASE_URL);
        }
    }

    const renderDevicesList = () => {
        return devicesList?.filter((dvc: Device) => {
            return deviceType.length && deviceType !== 'All' ? dvc.type === deviceType : dvc;
        })
        .sort((a: Device,b: Device) => {
            if (sortBy.length) {
                if (sortBy === 'hdd_capacity') {
                    return a.hdd_capacity - b.hdd_capacity;
                } else {
                    return a.system_name.charCodeAt(0) - b.system_name.charCodeAt(0);
                } 
            } else {
                return 0;
            }
        })
        .map((device: Device) => {
            return <DeviceInfo device={device} onMutation={handleMutation}></DeviceInfo>
        });
    }

    const getDeviceTypes = () => Object.keys(DeviceType).concat(['All']).map(dvcType => <MenuItem value={dvcType}>{dvcType}</MenuItem>);

    const getSortByOptions = () => ['hdd_capacity', 'system_name'].map(dvcProp => <MenuItem value={dvcProp}>{dvcProp}</MenuItem>);

    return (
        <Box display="flex" flexDirection="column" width="800px" margin="20px auto">
            <Box>
                <FormControl style={{width: '50%'}}>
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
                <FormControl style={{width: '50%'}}>
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
            <List>
                {renderDevicesList()}
            </List>
        </Box>
    )
}

export default MainView;