module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    {
      name: "@storybook/addon-links"
    },
    {
      name: "@storybook/addon-essentials"
    },
    {
      name: "@storybook/preset-create-react-app"
    }
  ]
}