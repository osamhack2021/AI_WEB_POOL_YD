import store from "@/store";
import { IPost, IUser } from "@/interfaces/IDatabaseData";

const demoUserData: Array<IUser> = [
  {
    id: "user-1",
    username: "전우님",
    profileImageUrl: "https://picsum.photos/seed/1/300",
    createdAt: new Date("2020-01-01 12:00:00"),
    confirmed: true,
    blocked: false,
    followings: [],
    followers: [],
    publishedPostIds: [100001],
    likedPostIds: [],
  },
  {
    id: "user-2",
    username: "용사님",
    profileImageUrl: "https://picsum.photos/seed/2/300",
    createdAt: new Date("2020-05-05 12:00:00"),
    confirmed: true,
    blocked: false,
    followings: [],
    followers: [],
    publishedPostIds: [],
    likedPostIds: [100001],
  },
];

const demoPostData: Array<IPost> = [
  {
    id: "100001",
    postType: "general",
    createdAt: new Date("2021-10-10 10:10:10"),
    updatedAt: new Date("2021-10-10 10:10:10"),
    author: demoUserData[0],
    title: "POOL 소개글",
    content: "군생활동안 성장하는 나의 이야기를 기록하고 공유하는, 자기개발 및 취업연결 SNS 플랫폼 「POOL」<br><br>군대 안에서 울고 웃으며, 목표를 위해 노력하면서 성장하는 우리들. 그러나 세상은 우리가 '삽질' 중이라고 합니다. POOL 은 군생활 중에도 미래를 향해 달려가는 국군 장병들의 노력으로 채워집니다. 풀에 가득 채운 나의 군생활 및 자기개발 기록은, 내가 군생활을 헛되이 보내지 않았음을 증명하는 자료가 됩니다.",
    contentPreview: "군생활동안 성장하는 나의 이야기를 기록하고 공유하는, 자기개발 및 취업연결 SNS 플랫폼 「POOL」",
    previewMainImageUrl: "https://github.com/osamhack2021/AI_WEB_POOL_YD/raw/develop/Doc/imgs/TOP_LOGO.png",
    tags: ["POOL", "소개"],
    commentsCount: 0,
    likesCount: 1,
    comments: [],
    likes: [demoUserData[1]],
    imageUrls: ["https://github.com/osamhack2021/AI_WEB_POOL_YD/raw/develop/Doc/imgs/TOP_LOGO.png"],
  },
  {
    id: "100002",
    postType: "general",
    createdAt: new Date("2021-10-12 13:11:10"),
    updatedAt: new Date("2021-10-14 15:22:08"),
    author: demoUserData[1],
    title: "데모용 포스트",
    content: "현재 <strong>오프라인 데모</strong> 모드입니다. <span style='font-size: 1.5em'>새로고침 시 변경사항(작성한 글 등)은 초기화됩니다.</span>",
    contentPreview: "현재 <strong>오프라인 데모</strong> 모드입니다. <span style='font-size: 1.5em'>새로고침 시 변경사항(작성한 글 등)은 초기화됩니다.</span>",
    tags: ["POOL", "소개"],
    commentsCount: 0,
    likesCount: 2,
    comments: [],
    likes: [demoUserData[0], demoUserData[1]],
    imageUrls: [],
  },
];

// eslint-disable-next-line
function handleAPIEndpoint(method: "get" | "post" | "put" | "del", endpoint: string, payload?: any): any {
  const normalized = endpoint.replace(/^\/+/, "");

  if (method === "get") {
    if (normalized === "users/demo_user") {
      // GET "/users/demo_user"

      return null;
    }

    if (/^posts\/full\/(.+)$/.test(normalized)) {
      // GET "/posts/full/{POST_ID}"
      const postId = /^posts\/full\/(.+)$/.exec(normalized)![1];

      return demoPostData.find((post) => post.id.toString() === postId.toString());
    }
  } else if (method === "post" && payload) {
    if (normalized === "posts/discover") {
      return demoPostData;
    }

    if (normalized === "posts") {
      const typedPayload: {
        title: string,
        content: string,
        author: string,
        postType: "general" | "recruition",
      } = payload;

      demoPostData.push({
        id: ((Math.random() * 10000) + 100010).toString(),
        postType: typedPayload.postType,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: store.state.loginState.userInfo!,
        title: typedPayload.title,
        content: typedPayload.content,
        contentPreview: typedPayload.content,
        tags: [],
        commentsCount: 0,
        likesCount: 0,
        comments: [],
        likes: [],
        imageUrls: [],
      });

      return true;
    }
  }

  return null;
}

export default handleAPIEndpoint;
