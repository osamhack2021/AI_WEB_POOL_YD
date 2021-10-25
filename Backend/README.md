# WEB BACKEND
POOL 서비스의 웹 백앤드 서버입니다.

## 기술 스택
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Strapi](https://strapi.io/)

## DB 구성도
![dbdiagram](/Doc/imgs/db-diagram.png)

## Strapi 서버 구동 방법
### Package download
```
cd Backend
yarn install
```
### port 설정
```
vi config/server.js
```
```
module.exports = ({ env }) => ({
     host: env('HOST', '0.0.0.0'),
     port: env.int('PORT', 1337),  // change this part
```
혹은 
```
vi .env
```
```
PORT = 443  // change this part
```
### 환경변수 설정
.env.example 참고하여 설정
```
DATABASE_URI = mongodb+srv://<ID>:<PW>@<clustername>.mnjek.mongodb.net/<dbname>?retryWrites=true&w=majority
AI_URL = http://www.example.com
AI_KEY = examplekeyhere
```
https://www.mongodb.com/atlas/database 에서 mongodb 가입 후 db 클러스터 생성  
db 생성 후 제공되는 database uri를 위와 같은 양식에 맞춰 작성  
AI_URL의 경우 post embedding AI 모델 배포된 서버의 url 기입  
AI_KEY는 http authorization header에 들어갈 key

### developing mode
```
yarn develop
```
### production mode
```
NODE_ENV=production yarn build
NODE_ENV=production yarn start
```
https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/deployment.html

## API 명세
기본적인 메서드는 default로 제공
https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-endpoints  
- #### /posts/discover (POST)
```
// request body
// type == "discover"
{
    type: "discover",
	target: "user", // 'user', 'pool', 'recruition'
	tags: [
			{ 
				subject: "계급", 
				tag: "일병",
			},
			{
				subject: "병과",
				tag: "공병",
			},
			{
				subject: "병과",
				tag: "군수-병기",
			}
		],
}
// type == "recommend"
{
    type: "recommend",
    userID: string,
}
```
```
// response body
// type == "discover"
{
    data: Array<object>
}
// type == "recommend"
// return sorted recommended posts
Array<object>
```

- #### /posts/test/:postId (GET)

```
// response body
// user data containing embedding column
{
    username: string,
    ...,
    embedding: {
        data: Array<float>
    }
}
```