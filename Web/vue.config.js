/* eslint-disable */

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/AI_WEB_POOL_YD/" : "/",
  transpileDependencies: [
    "vuetify",
  ],
<<<<<<< HEAD
  css: { loaderOptions: { scss: { additionalData: " @import \"./src/styles/pool_styles.scss\"; " } } },
};
=======
  devServer: {
    proxy: {
        '/posts': {
            "target": 'http://localhost:1337',
        },
        '/comments': {
            "target": 'http://localhost:1337',
        },
        '/users': {
            "target": 'http://localhost:1337',
        },  
    }
  },
  css: { loaderOptions: { scss: { additionalData: " @import \"./src/styles/pool_styles.scss\"; " } } },
};
>>>>>>> a25a140e740bd1ec391f327a12774e397e23ba71
