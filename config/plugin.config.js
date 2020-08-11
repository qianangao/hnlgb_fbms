import path from 'path';

function getModulePackageName(module) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');

  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName = moduleDirName; // handle tree shaking

  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)[1];
  }

  return packageName;
}

export const webpackPlugin = config => {
  config.merge({
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 2,
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test({ resource }) {
              return /[\\/]node_modules[\\/]/.test(resource);
            },
            priority: 10,
          },
        },
      },
    },
  });
};
