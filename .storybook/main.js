const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
    // {
    //   files: '*.stories.*',
    //   titlePrefix: 'MyComponents',
    // }
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        rule: {
        test: /\.(scss|sass)$/i,
      },
     },
    }
  ],
  "staticDirs": ['../'],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5",
  }
}