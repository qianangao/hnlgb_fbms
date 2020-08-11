import md from 'utility';
import CryptoJS from 'crypto-js';

export default {
  'POST /login': (req, res) => {
    const { password, username } = req.body;

    const encrypt = word => {
      const key = CryptoJS.enc.Utf8.parse('liantong20200805');
      const srcs = CryptoJS.enc.Utf8.parse(word);
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    };

    if (password === md.md5('123456') && username === encrypt('admin')) {
      res.send({
        code: 0,
        msg: 'success',
        data: {
          username: 'admin',
          token: 'ee89951e230fa35be42826c48956f7c2',
          userInfo: {
            id: '1',
            account: 'admin',
            name: '请勿删除',
            authoritys: ['page1', 'page2', 'page3', 'page11', 'page12', 'page13'],
          },
        },
      });
      return;
    }

    if (password === md.md5('1234567') && username === 'admin') {
      res.send({
        msg: '暂无权限',
        code: '000100',
        data: null,
      });
      return;
    }

    if (password === md.md5('123456') && username === encrypt('user')) {
      res.send({
        code: 0,
        msg: 'success',
        data: {
          username: 'user',
          token: 'dwaf532fsa352r1daw24',
          userInfo: {
            id: '2',
            account: 'user',
            name: '当时超',
            authoritys: ['page1', 'page11', 'page13'],
          },
        },
      });
      return;
    }

    res.status(403).send({
      msg: '暂无权限',
      code: '000100',
      data: null,
    });
  },
  'POST /logout': (req, res) => {
    res.send({
      code: 0,
      msg: 'success',
      data: {},
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
