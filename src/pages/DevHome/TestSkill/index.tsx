import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { DEFAULT_API } from "constants/index";
import axios from 'axios';

const TestSkill = () => {
    const [demoData, setDemoData] = React.useState<string | undefined>(undefined);
    React.useEffect(() => {
        axios.get(`${DEFAULT_API}/test`)
            .then((res: any) => console.log(res))
            .catch((error: any) => console.error(error))

    }, [])
    return <div>
        测试功能
        <Box
            component="form"

            autoComplete="off"
        >
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple-demo">demoData</InputLabel>
                <Input id="component-simple-demo" aria-describedby="component-helper-text-demo" value={demoData} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDemoData(event.target.value)
                }} />
                <FormHelperText id="component-helper-text-demo">实时修改数据库某个字段,onBlur更新</FormHelperText>
            </FormControl>
        </Box>
    </div>
}

export default TestSkill;