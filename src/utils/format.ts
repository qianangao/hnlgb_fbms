import moment from 'moment';
import CryptoJS from 'crypto-js';

export function formatDate(timeStr, cformat = 'YYYY-MM-DD') {
  return timeStr ? moment(timeStr, cformat) : null;
}

export const encrypt = word => {
  const key = CryptoJS.enc.Utf8.parse('liantong20190410');
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

export const decrypt = word => {
  const key = CryptoJS.enc.Utf8.parse('liantong20190410');
  const options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  };
  const decryptedData = CryptoJS.AES.decrypt(word, key, options);
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
};
