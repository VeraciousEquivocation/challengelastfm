import React from 'react';
import clsx from 'clsx';
import scss from './errorcard.module.scss';
import Paper from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Block from '@material-ui/icons/Block';

type Props = {
  open: boolean
  zeroResults?: boolean
}

const ErrorCard:React.FC<Props> = ({open, zeroResults}) => {
  let message:JSX.Element = (
    <>
      <div className={scss.icon}><Block/></div>
      <Typography className={scss.text}>Zero Results</Typography>
      <div className={scss.icon}><Block /></div>
    </>
  )
  if(zeroResults) {
    message = (
      <>
        <div className={scss.icon}><Block/></div>
        <Typography className={scss.text}>Zero Results</Typography>
        <div className={scss.icon}><Block /></div>
      </>
    )
  } else {
    message = (
      <>
        <div className={scss.icon}><ErrorOutlineIcon/></div>
        <Typography className={scss.text}>Something went wrong</Typography>
        <div className={scss.icon}><ErrorOutlineIcon /></div>
      </>
    )
  }

  return (
    <Slide direction={'up'} in={open}  mountOnEnter unmountOnExit>
      <Paper elevation={3} className={clsx([zeroResults && scss.paperBlue], scss.paper)}>
        <div className={scss.row}>
          {message}
        </div>
      </Paper>
    </Slide>
  );
}

export default ErrorCard; 