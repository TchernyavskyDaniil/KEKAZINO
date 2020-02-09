import React from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { FileUploader } from '@features/FileUploader';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';
import {
  $userImageUrl,
  removeUploadedImage,
  $imageFetching,
} from '@pages/ImageUploader/model';
import { setImageUrlExistStatus } from '@pages/Roulette/model';

export const ImageUploader: React.FC = () => {
  const imageUrl = useStore($userImageUrl);
  const isDone = useStore($imageFetching.isDone);

  const classes = useUploaderStyles();

  const history = useHistory();

  const handleOnClickToDeleteImage = () => {
    removeUploadedImage();
  };

  const handleOnClickToSaveImage = () => {
    setImageUrlExistStatus(true);
    history.push('/roulette');
  };

  return (
    <div className={classes.root}>
      <FileUploader />
      {imageUrl && (
        <Image
          src={imageUrl}
          style={{ marginTop: '20px', paddingTop: 0 }}
          imageStyle={{ width: '600px', position: 'relative' }}
        />
      )}
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
            startIcon={<SaveIcon />}
            onClick={handleOnClickToSaveImage}>
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
