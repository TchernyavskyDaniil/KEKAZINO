import React from 'react';
import styled from 'reshadow';
import { useStore } from 'effector-react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';
import { $userImageUrl, removeUploadedImage, $imageFetching } from '@pages/ImageUploader/model';

import { FileUploader } from '@features/FileUploader';

export const ImageUploader: React.FC = () => {
  const imageUrl = useStore($userImageUrl);
  const isDone = useStore($imageFetching.isDone);

  const classes = useUploaderStyles();

  const handleOnClickToDeleteImage = () => {
    removeUploadedImage();
  };

  // const handleOnClickToSaveImage = () => {
  //
  // }

  return (
    <div className={classes.root}>
      <FileUploader />
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
