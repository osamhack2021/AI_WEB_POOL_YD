/* eslint-disable */

module.exports = {
  devServer: {
    disableHostCheck : process.env.NODE_ENV !== "production",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/AI_WEB_POOL_YD/" : "/",
  transpileDependencies: [
    "vuetify",
  ],
  css: { loaderOptions: { scss: { additionalData: " @import \"./src/styles/pool_styles.scss\"; " } } },
};

