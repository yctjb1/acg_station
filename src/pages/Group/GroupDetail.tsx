import React, { useCallback, useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { atomFrameType } from "models/index";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const GroupDetail = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);
    const theme = useTheme();
    const { groupId } = useParams();

    const [minorTabvalue, setMinorTabvalue] = React.useState(0);

    const handleChangeMinorTab = (event: React.SyntheticEvent, newValue: number) => {
        setMinorTabvalue(newValue);
    };


    useEffect(() => {
    }, [groupId])

    const MainStage = () => {
        return <div className="w-3/4 border border-solid border-indigo-500">
            <div onClick={() => {

            }}>
                标题:这里是部落{groupId} [喜欢] [屏蔽]
            </div>
            这里是主舞台<br />
            (ui没写，功能没做，先上线扔简历里)
        </div>
    }
    const MinorStage = () => {
        return <div className="w-1/4 border border-solid border-teal-400">
            <Tabs
                value={minorTabvalue}
                onChange={handleChangeMinorTab}
                variant="scrollable"
                scrollButtons
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                <Tab label="聊天" />
                <Tab label="人群" />
                <Tab label="黑名单" />
                <Tab label="屏蔽表" />
                <Tab label="demo1" />
                <Tab label="demo2" />
                <Tab label="demo3" />
                <Tab label="demo4" />
            </Tabs>

            <TabPanel value={minorTabvalue} index={0} >
                这里是聊天
            </TabPanel>
            <TabPanel value={minorTabvalue} index={1} >
                这里是人群
            </TabPanel>
            <TabPanel value={minorTabvalue} index={2} >
                这里是黑名单
            </TabPanel>
            <TabPanel value={minorTabvalue} index={3} >
                这里是屏蔽表
            </TabPanel>
            <TabPanel value={minorTabvalue} index={4} >
                这里是demo1
            </TabPanel>
            <TabPanel value={minorTabvalue} index={5} >
                这里是demo2
            </TabPanel>
            <TabPanel value={minorTabvalue} index={6} >
                这里是demo3
            </TabPanel>
            <TabPanel value={minorTabvalue} index={7}>
                这里是demo4
            </TabPanel>
        </div>
    }

    return (
        <div className="flex justify-center">
            <Helmet>
                <title>{"部落" + groupId}</title>
            </Helmet>
            <div className="flex w-10/12" style={{
                minHeight: "calc(100vh - 200px)"
            }}>
                <MainStage />
                <MinorStage />
            </div>
        </div>
    );
};

export default GroupDetail;
