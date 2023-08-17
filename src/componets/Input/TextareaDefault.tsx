import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import styles from './textarea-default.module.less'
const TextareaDefault = (props: any) => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };



  return <TextareaAutosize {...props} className={styles.textareaDefault} />;
}

export default TextareaDefault;