import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useLocation, useNavigate } from 'react-router-dom';

//单选下拉跳页按钮
interface IbtnOption {
    key: number | string;
    label: string;
    disabled?: boolean;
    href?: string;
}

const SplitButton = (props: any & {
    btnOptions?: IbtnOption[]
}) => {
    const options: IbtnOption[] = [
        {
            key: 1,
            label: "测试选项1",
            href: "/web/dev/ui"
        },
        {
            key: 2,
            label: "测试选项2",
            href: "/web/dev/test_skill"
        },
        {
            key: 3,
            label: "测试选项3",
        }
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const { btnOptions = options } = props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const objKeyOptions: any = React.useMemo(() => {
        const result: any = {}
        btnOptions.map((item: IbtnOption) => {
            if (item.key) {
                result[item.key] = item;
            }
        })
        return result;
    }, [btnOptions])
    const [selectedKey, setSelectedKey] = React.useState(btnOptions?.[0]?.key);
    const [selectedLabel, setSelectedLabel] = React.useState(btnOptions?.[0]?.label);
    const handleClick = (selectedKey: number | string) => {

    };
    useEffect(() => {
        btnOptions.map(((option: IbtnOption) => {
            if (option.href === pathname) {
                setSelectedKey(option.key)
                setSelectedLabel(option.label)
            }
        }))
    }, [])
    // },[pathname])
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        option: IbtnOption,
    ) => {
        setSelectedKey(option.key)
        setSelectedLabel(option.label)
        setOpen(false);

        if (!option?.disabled && option.href) {
            navigate(option.href)
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button>{selectedLabel}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement='bottom-start'
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {btnOptions.map((option: IbtnOption, index: number) => (
                                        <MenuItem
                                            key={option.key}
                                            disabled={option?.disabled}
                                            selected={option.key === selectedKey}//?
                                            onClick={(event) => handleMenuItemClick(event, option)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
export default SplitButton;