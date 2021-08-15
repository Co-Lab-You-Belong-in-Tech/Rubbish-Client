// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const blacklist = require('metro-config/src/defaults/blacklist');

const defaultConfig = getDefaultConfig(__dirname);
// Solving duplicated files error causing by amplify backend:
// blacklist adds #current-cloud-backend to the regex
// revised blacklistRE: /(#current-cloud-backend\/.*|node_modules\/react\/dist\/.*|website\/node_modules\/.*|heapCapture\/bundle\.js|.*\/__tests__\/.*)$/
defaultConfig.resolver.blacklistRE = blacklist([/#current-cloud-backend\/.*/]);

module.exports = defaultConfig;
