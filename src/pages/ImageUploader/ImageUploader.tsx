import React from 'react';
import clsx from 'clsx';
import styled from 'reshadow';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';

interface MInputFile {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

const InputFile = (props: MInputFile): JSX.Element =>
  styled`
    input {
      display: none;
    }
  `(<input onChange={props.onChange} id="file-upload" type="file" />);

let timer: number;

export const ImageUploader: React.FC = (): JSX.Element => {
  const classes = useUploaderStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(
    () => () => {
      window.clearTimeout(timer);
    },
    [],
  );

  const handleButtonClick = () => {
    if (!loading) {
      const fileUploadNode = document.getElementById('file-upload');

      if (fileUploadNode) {
        fileUploadNode.click();
      }
    }
  };

  const handleOnChangeFile = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!loading) {
      console.log(files);
      setSuccess(false);
      setLoading(true);
      timer = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}>
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}>
          Download your photo
        </Button>
        <InputFile onChange={handleOnChangeFile} />
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
};
