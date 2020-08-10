import Cookies from 'js-cookie';

export const TOKEN_KEY = 'RETURN_WORK_TOKEN'; // token存储的键
export const getCookie = key => Cookies.get(key); // => 'value'

export const setCookie = (key, value) => {
  Cookies.set(key, value); // => 'value'
};

export const removeCookie = key => {
  Cookies.remove(key);
};
