// eslint-disable-next-line no-unused-vars
import { createEvent, createStore, createEffect, Event } from 'effector';
import React from 'react';
import { base64ImageConverter } from '@lib/utils';
import { createFetching } from '@lib/createFetching';

export const $userImageUrl = createStore<string>('');

export const addUserImageUrl: Event<string> = createEvent();
export const setUploadingImageStatus: Event<boolean> = createEvent();
export const setSuccessfullyImageUploadedStatus: Event<boolean> = createEvent();

// Events - resets
export const removeUploadedImage: Event<void> = createEvent();

export const pickNewUserImage = createEffect({
  handler: async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const uploadedFile = files[0];
      const isFile = uploadedFile.type.includes('image');
      if (isFile) {
        await base64ImageConverter(uploadedFile, addUserImageUrl);
      }
    }
  },
});

$userImageUrl.on(addUserImageUrl, (_, url) => url).reset(removeUploadedImage);

export const imageFetching = createFetching(pickNewUserImage, 'initial', {
  reset: removeUploadedImage,
});
