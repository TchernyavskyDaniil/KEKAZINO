import * as React from 'react';
import clsx from 'clsx';
import styled from 'reshadow';
import { useStore } from 'effector-react';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { $imageFetching, pickNewUserImage } from '@pages/ImageUploader/model';

import { useFileUploaderStyles } from '@features/FileUploader/useFileUploaderStyles';

const FileUploaderMemoized: React.FC = () => {
  const isDone = useStore($imageFetching.isDone);
  const isLoading = useStore($imageFetching.isLoading);

  const classes = useFileUploaderStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isDone,
  });

  const handleButtonClick = () => {
    if (!isLoading) {
      const fileUploadNode = document.getElementById('file-upload');

      if (fileUploadNode) {
        fileUploadNode.click();
      }
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}>
          {isDone ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={isLoading}
          onClick={handleButtonClick}>
          Choose your best photo!
        </Button>
        <InputImage handleOnChangeImage={pickNewUserImage} />
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </>
  );
};

export const FileUploader = React.memo(FileUploaderMemoized);

interface InputFileProps {
  handleOnChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputImage = ({ handleOnChangeImage }: InputFileProps): JSX.Element =>
  styled`
    input {
      display: none;
    }
  `(<input onChange={handleOnChangeImage} id="file-upload" type="file" accept="image/*" />);
