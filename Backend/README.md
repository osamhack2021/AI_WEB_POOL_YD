# Strapi 구동 방법
## port 설정
```
vi config/server.js
```
```
module.exports = ({ env }) => ({
     host: env('HOST', '0.0.0.0'),
     port: env.int('PORT', 1337),  // change this part
```

## developing mode
```
yarn develop
```
## production mode
```
NODE_ENV=production yarn build
NODE_ENV=production yarn start
```
https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/deployment.html

## api call example (at vue page)
```
fetch('/posts')
.then((res) => res.json())
.then((data) => console.log(data)) // do something with data
```


