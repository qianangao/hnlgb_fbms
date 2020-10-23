/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/hnlgb-server': {
      target: 'http://10.92.119.106:9000',
      changeOrigin: true,
      pathRewrite: {
        '^/hnlgb-server': '',
      },
    },
  },
  test: {
    '/hnlgb-server': {
      target: 'http://10.92.119.138:11111/lgbsmp/api/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/hnlgb-server': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
