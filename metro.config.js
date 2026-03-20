/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @format
 * @type {{resolver: {assetExts: string[]}, transformer: {getTransformOptions: () => Promise<{experimentalImportSupport: boolean, inlineRequires: boolean}>}, serializer: {getModulesRunBeforeMainModule: () => string[]}, server: {port: number}, resetCachePath: string}}
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        // Removed explicit babelTransformerPath to allow Expo's default setup
        experimentalImportSupport: false,
        inlineRequires: true,
      }),
      minifierConfig: {
        // Disable Hermes
        hermes: {
          enabled: false,
        },
      },
    },
    resolver: {
      // Supported file extensions
      sourceExts: [...sourceExts, 'ts', 'tsx'],
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
    },
    // Specify the reset cache path to ensure changes are picked up
    resetCachePath: process.cwd(),
  };
})();
