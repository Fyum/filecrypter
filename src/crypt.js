import fs from 'fs';
import crypto from 'crypto';
import { defaultPath as DEFAULT_PATH } from '../properties.json';

const cipher = crypto.createCipher('aes192', 'pass');

const crypt = ({
  path = DEFAULT_PATH,
} = {}) => {
  const pathTmp = `${path}-tmp`;
  const reader = fs.createReadStream(path);
  const writer = fs.createWriteStream(pathTmp);
  console.log(path);
  try {
    reader
      .pipe(cipher)
      .pipe(writer);
  } catch (err) {
    console.log('Crypting error : ', err);
  }

  writer.on('finish', () => {
    fs.unlink(path, (err) => { console.log('Remove file error :', err); });
    fs.rename(pathTmp, path, (err) => { console.log('Rename file error:', err); });
  });
};

export default crypt;
