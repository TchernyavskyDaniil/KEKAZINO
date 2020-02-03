import React from 'react';
import styled from 'reshadow';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';
import { base64ImageConverter } from '@lib/utils';

interface InputFileProps {
  handleOnChangeFile: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

const InputImage = ({ handleOnChangeFile }: InputFileProps): JSX.Element =>
  styled`
    input {
      display: none;
    }
  `(<input onChange={handleOnChangeFile} id="file-upload" type="file" accept="image/*" />);

interface FileViewerProps {
  imageUrl: string;
}

const FileViewer = ({ imageUrl }: FileViewerProps): JSX.Element =>
  styled`
    img {
      width: 600px;
      margin-top: 40px;
    }
  `(
    <img
      alt="Ваше загруженное фото, если вы это видите, то что - то не так :)"
      title="Ваше загруженное фото"
      src={imageUrl}
    />,
  );

export const ImageUploader: React.FC = (): JSX.Element => {
  const classes = useUploaderStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const buttonClassname = success ? classes.buttonSuccess : '';

  const handleButtonClick = () => {
    if (!loading) {
      const fileUploadNode = document.getElementById('file-upload');

      if (fileUploadNode) {
        fileUploadNode.click();
      }
    }
  };

  const handleOnChangeFile = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      const uploadedFile = files[0];
      const isFile = uploadedFile.type.includes('image');
      if (isFile) {
        setSuccess(false);
        setLoading(true);

        await base64ImageConverter(uploadedFile, setImageUrl);

        setSuccess(true);
        setLoading(false);
      }
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
        <InputImage handleOnChangeFile={handleOnChangeFile} />
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {imageUrl && <FileViewer imageUrl={imageUrl} />}
    </div>
  );
};
