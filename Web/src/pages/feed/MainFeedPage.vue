<template>
  <v-container fluid class="feed-container">
    <v-responsive class="mx-auto pa-2 px-sm-6" max-width="800px">
      <feed-compose class="my-3" />

      <v-divider class="my-8" />

      <feed-item v-for="item in feedItems"
        class="my-8"
        :key="item.index"
        :itemData="item" />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FeedItemComponent from "@/components/feed/FeedItem.vue";
import FeedComposeComponent from "@/components/feed/FeedCompose.vue";
import IFeedItem from "@/interfaces/IFeedItem";

@Component({
  components: {
    FeedItem: FeedItemComponent,
    FeedCompose: FeedComposeComponent,
  },
})
export default class MainFeedPage extends Vue {
  get feedItems(): Array<IFeedItem> {
    return [
      {
        postInfo: {
          id: "1a2b3c4d",
          postType: "recruition",
          author: {
            id: "user-11223344",
            username: "JWS",
            profileImageUrl: "https://picsum.photos/seed/one1/200",
          },
          createdAt: new Date(Date.now() - Math.random() * 10000),
          title: "기나긴 여행의 끝을 향해",
          contentPreview: "이곳에 HTML!",
          previewMainImageUrl: "https://picsum.photos/seed/one2/600/200",
          tags: ["뻘글"],
          commentsCount: Math.floor(Math.random() * 50),
          likesCount: Math.floor(Math.random() * 200),
        },
        likedByAccount: false,
      },
      {
        postInfo: {
          id: "4a3b2c1d",
          postType: "recruition",
          author: {
            id: "user-44332211",
            username: "CMG",
            profileImageUrl: "https://picsum.photos/seed/two1/200",
          },
          createdAt: new Date(Date.now() - (Math.random() * 500000 + 10000)),
          title: "군생활이 곧 끝나가지만...",
          contentPreview: "메인 이미지가 없는 피드 아이템!",
          tags: ["뻘글", "그냥"],
          commentsCount: Math.floor(Math.random() * 50),
          likesCount: Math.floor(Math.random() * 200),
        },
        likedByAccount: true,
      },
      {
        postInfo: {
          id: "9a8b7c6d",
          postType: "general",
          author: {
            id: "user-99887766",
            username: "OJS",
            profileImageUrl: "https://picsum.photos/seed/three1/200",
          },
          createdAt: new Date(Date.now() - (Math.random() * 10000000 + 510000)),
          title: "Strapi와 MongoDB 사용하기",
          contentPreview: "이것도 메인 이미지가 없어요",
          tags: ["뻘글", "개발"],
          commentsCount: Math.floor(Math.random() * 50),
          likesCount: Math.floor(Math.random() * 200),
        },
        likedByAccount: false,
      },
      {
        postInfo: {
          id: "6a7b8c9d",
          postType: "general",
          author: {
            id: "user-66778899",
            username: "PJO",
            profileImageUrl: "https://picsum.photos/seed/four1/200",
          },
          createdAt: new Date(Date.now() - (Math.random() * 10000000 + 10510000)),
          title: "군대에서 딥러닝 공부하기",
          contentPreview: "<b>제가 LA에 있을때는 말이죠</b> 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 <u>싸인해달라 기자들은 항상 붙어다니며 취재하고</u> 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요 <span style='font-size: 14pt'>못던져서 그만두고</span> 그냥 확 한국으로 가버리고 싶었어요 그래서 <span style='font-size: 18pt'>집에 가는길에 그 맥주6개</span> 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로 가버릴려구.... 그리고 맥주 6개먹고 확 죽어버릴려고 그랬어요 야구 못하게 되니깐 그러나 집에가서 일단은 부모님에게 전화를 해야겠다고 생각을 했어요 다음날 가려고 전화를 딱 했는데 어머니께서 찬호야 어후~ 찬호야 아들 잘있어 밥은 먹고 다니는겨~ 잘지내는겨 대뜸 그러시는 거에요 내가 말도 하기도 전해 그래서 저는 야구좀 안되지만 잘하고 있다고 여기사람들 잘챙겨준다고 라고 거짓말을  했어요 한국은 못가게 됬지 내일 야구장은 가야하지 막막하더라구요 그럼 어떻게 가야하나 생각을 했어요 그리고 나서 영어공부를 하게 됬는데요 영어... 감독한테 이야기를 못해서 한이 맺힌거지 그래서 이야기 할려고 한 단어씩 한 문장씩 만들어서 그래서 다음날 써 먹었어요 그리고 감독에게 Hey How are you라고 말했어요 이렇게 해서 영어공부를 하는거에요 그리고 마이너생활하다. 이제 메이저리그로 콜업이 됬어요 너무 긴장이 되더라구요",
          previewMainImageUrl: "https://picsum.photos/seed/four2/600/200",
          tags: ["뻘글", "투머치토커"],
          commentsCount: Math.floor(Math.random() * 50),
          likesCount: Math.floor(Math.random() * 200),
        },
        likedByAccount: false,
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
.feed-container {
  background-color: #FAFBFB;
}
</style>
