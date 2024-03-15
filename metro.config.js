const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */


module.exports = mergeConfig(getDefaultConfig(__dirname), {
    server: {
        port: 8081, // Cổng Metro Server
    },
});
