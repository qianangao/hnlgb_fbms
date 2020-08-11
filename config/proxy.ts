/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/inspection-server': {
      target: 'http://10.92.119.138:11111/ecpsmp/api',
      changeOrigin: true,
      pathRewrite: {
        '^/inspection-server': '',
      },
    },
  },
  test: {
    '/inspection-server': {
      target: 'http://10.92.119.138:11111/ecpsmp/api',
      changeOrigin: true,
      pathRewrite: {
        '^/inspection-server': '',
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
