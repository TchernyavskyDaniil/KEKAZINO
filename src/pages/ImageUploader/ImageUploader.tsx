import React from 'react';
import styled from 'reshadow';
import clsx from 'clsx';
import { useStore } from 'effector-react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';
import {
  $userImageUrl,
  removeUploadedImage,
  $imageFetching,
  pickNewUserImage,
} from '@pages/ImageUploader/model';

export const ImageUploader: React.FC = () => {
  const imageUrl = useStore($userImageUrl);
  const isLoading = useStore($imageFetching.isLoading);
  const isDone = useStore($imageFetching.isDone);

  const classes = useUploaderStyles();

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

  const handleOnClickToDeleteImage = () => {
    removeUploadedImage();
  };

  // const handleOnClickToSaveImage = () => {
  //
  // }

  return (
    <div className={classes.root}>
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
      {imageUrl && <FileViewer imageUrl={imageUrl} />}
      {isDone && (
        <Grid
          className={classes.gridRoot}
          container
          direction="row"
          justify="center"
          alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<SaveIcon />}>
            Save it!
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleOnClickToDeleteImage}>
            Nah, delete it
          </Button>
        </Grid>
      )}
    </div>
  );
};

interface InputFileProps {
  handleOnChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputImage = ({ handleOnChangeImage }: InputFileProps): JSX.Element =>
  styled`
    input {
      display: none;
    }
  `(<input onChange={handleOnChangeImage} id="file-upload" type="file" accept="image/*" />);

interface FileViewerProps {
  imageUrl: string;
}

const FileViewer = ({ imageUrl }: FileViewerProps): JSX.Element =>
  styled`
    img {
      width: 600px;
      margin-top: 20px;
    }
  `(
    <img
      alt="Ваше загруженное фото, если вы это видите, то что - то не так :)"
      title="Ваше загруженное фото"
      src={imageUrl}
    />,
  );
