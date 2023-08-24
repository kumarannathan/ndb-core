module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/angular",
    options: {
      builder: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
    features: {
      storyStoreV7: false,
    },
  },
};
