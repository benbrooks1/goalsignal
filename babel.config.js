module.exports = {
  presets: [
    ["@vue/app", { useBuiltIns: "entry", corejs: 3 }],
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry"
      }
    ]
  ],
  env: {
    production: {
      plugins: ["transform-remove-console"]
    }
  }
};
