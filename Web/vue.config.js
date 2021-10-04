/* eslint-disable */

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/AI_WEB_POOL_YD/" : "/",
  transpileDependencies: [
    "vuetify",
  ],
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
  }
};
