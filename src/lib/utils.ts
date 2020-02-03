export const base64ImageConverter = async (file: File, imageSetter: Function) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imageSetter(reader.result);
  });

  await reader.readAsDataURL(file);
};
