module.exports = {
  stories: ['../stories/**/*.stories.js', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs/register', '@storybook/addon-viewport/register'],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};

/*
// before version 5.2 of storybook, you require:
const req = require.context('../src/components', true, /\.stories\.js$/)

// inside loadStories
req.keys().forEach(fileName => req(fileName))
*/