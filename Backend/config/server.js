module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 443),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '8cea754f8cfb907717ed2c72218520e5'),
    },
  },
});
