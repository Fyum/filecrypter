import fs from 'fs';
import crypto from 'crypto';
import { defaultPath as DEFAULT_PATH } from '../properties.json';

const decipher = crypto.createDecipher('aes192', 'pass');

const decrypt = ({
  path = DEFAULT_PATH,
} = {}) => {
  const pathTmp = `${path}-tmp`;
  const reader = fs.createReadStream(path);
  const writer = fs.createWriteStream(pathTmp);
  try {
    reader
      .pipe(decipher)
      .pipe(writer);
  } catch (err) {
    console.log('Decrypting error : ', err);
  }

  writer.on('finish', () => {
    fs.unlink(path, (err) => { console.log('Remove file error :', err); });
    fs.rename(pathTmp, path, (err) => { console.log('Rename file error:', err); });
  });
};

export default decrypt;
