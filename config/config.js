import routers from '../router';
import webpackPlugin from './plugin.config';
import theme from '../theme';
import { defineConfig, utils } from 'umi';
const { winPath } = utils;

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  pwa: false,
  lessLoader: {
    javascriptEnabled: true,
  },
  hash: true,
  favicon: '/favicon.ico',
  targets: {
    ie: 11,
  },
  publicPath: '/hnlgb-fbms/',
  base: '/hnlgb-fbms/',
  manifest: {
    basePath: '/hnlgb-fbms/',
  },
  routes: routers,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  define: {
    // 开发环境下，且mock不为none，视为使用mock数据
    'process.env.USE_MOCK': process.env.MOCK !== 'none' && process.env.NODE_ENV === 'development',
  },
  ignoreMomentLocale: true,
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (context, _, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
          return `unicom${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  chainWebpack: webpackPlugin,
  devServer: {},
  proxy: {
    '/hnlgb-server': {
      target: 'http://va2dy9.natappfree.cc/ecpsmp/api',
      changeOrigin: true,
      pathRewrite: {
        '^/hnlgb-server': '',
      },
    },
  },
});
