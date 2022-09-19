import sharp from 'sharp';

export const resize = async (
  path: string,
  fileName: string,
  width: string,
  height: string
) => {
  try {
    console.log('Resizing Image!');
    await sharp(`images/${fileName}.jpg`)
      .resize(parseInt(width), parseInt(height))
      .toFile(path);
  } catch (err) {
    console.log(err);
  }
};
