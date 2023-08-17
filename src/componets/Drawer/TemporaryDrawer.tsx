import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


type IAnchor = 'top' | 'left' | 'bottom' | 'right';
interface IDrawerProps {
    anchor: IAnchor
    children?: any
}


const TemporaryDrawer = () => {


    const [showDrawer, setShowDrawer] = React.useState(false);

    const DrawerCompoent = (props: IDrawerProps) => {
        const { anchor, children } = props;
        return (<Drawer
            anchor={anchor}
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
        >
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
            >
                {children}
            </Box>
        </Drawer>)
    }
    return {
        useShowDrawer: () => ({ showDrawer, setShowDrawer }),
        DrawerCompoent
    };
}

export default TemporaryDrawer;
