<template>
  <v-responsive class="pb-8 page-container">
    <!-- 상단 메인 이미지 영역 -->
    <v-img :src="postData.previewMainImageUrl"
           dark
           width="100%"
           height="300px">
      <div class="post-image-darken-overlay"></div>

      <v-layout align-center justify-center fill-height class="mx-auto" style="max-width: 800px">
        <div class="text-h3 text-center">{{ postData.title }}</div>
      </v-layout>
    </v-img>
    <!-- -->

    <v-card width="95%" max-width="800px" elevation="8" class="mx-auto mt-n8 pa-2 pa-sm-8">
      <!-- 글 컨텐츠 영역 -->
      <v-card-text v-html="postData.contentFull" class="text-body-1" style="color: rgba(0, 0, 0, 0.8)" />
      <!-- -->

      <!-- 작성자 영역 -->
      <v-layout class="mt-8 pa-2">
        <v-spacer />

        <v-layout justify-end style="flex-grow: 0; flex-wrap: wrap-reverse">
          <v-layout column justify-center align-end class="mx-3">
            <div>written by <strong>{{ postData.author.username }}</strong></div>
            <div style="font-size: 0.75em; color: gray; text-align: right">글 게시 <strong>{{ postData.createdAt.toLocaleString() }}</strong></div>
            <div v-if="isPostUpdatedSincePublish" style="font-size: 0.75em; color: gray; text-align: right">마지막 글 업데이트 <strong>{{ postData.updatedAt.toLocaleString() }}</strong></div>
          </v-layout>

          <v-img :src="postData.author.profileImageUrl"
                 aspect-ratio="1"
                 width="64px"
                 max-width="64px"
                 class="my-3 elevation-2"
                 style="border-radius: 100%" />
        </v-layout>
      </v-layout>
      <!-- -->

      <v-divider class="my-4" />

      <!-- 태그 영역 -->
      <v-layout wrap>
        <v-btn v-for="tag in postData.tags"
              :key="tag"
              outlined
              color="primary"
              class="ma-2">#{{ tag }}</v-btn>
      </v-layout>
      <!-- -->

      <v-divider class="my-4" />

      <!-- 리액션 버튼 영역 -->
      <v-card-actions>
        <v-layout row justify-space-between>
          <v-btn class="pa-0 px-2" text @click.stop.prevent="scrollTo('#comments')"><v-icon class="mr-1">mdi-message-reply-text</v-icon> 댓글 {{ postData.commentsCount }}개</v-btn>
          <v-btn class="pa-0 px-2" text @click.stop.prevent="onLikeButtonClick"><v-icon class="mr-1">mdi-heart</v-icon> 좋아요 {{ postData.likesCount }}개</v-btn>
        </v-layout>
      </v-card-actions>
      <!-- -->

      <!-- 댓글 목록 영역 -->
      <v-container id="comments" class="pa-2">
        <v-list>
          <v-list-item v-for="comment in postData.comments"
                       :key="comment.id">
            <v-list-item-avatar style="align-self: flex-start"><v-img :src="comment.author.profileImageUrl" /></v-list-item-avatar>
            <v-list-item-content class="pt-2">
              <v-list-item-title>{{ comment.author.username }}</v-list-item-title>
              <v-list-item-subtitle style="white-space: pre-wrap">{{ comment.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item>
            <v-list-item-avatar style="align-self: flex-start"><v-img :src="$store.state.loginState.userInfo.profileImageUrl" /></v-list-item-avatar>
            <v-list-item-content class="pt-2">
              <v-list-item-title>댓글 남기기 <small>// {{ $store.state.loginState.userInfo.username }}</small></v-list-item-title>
              <v-list-item-subtitle class="py-2"><v-textarea class="py-0 my-0" placeholder="글쓴이에게 하고싶은 말을 남겨보세요." rows="3" auto-grow hide-details no-resize /></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <!-- -->
    </v-card>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import goTo from "vuetify/lib/services/goto";
import { GoToOptions, VuetifyGoToTarget } from "vuetify/types/services/goto.d";
import { IPost } from "@/interfaces/IDatabaseData";

@Component
export default class PostViewPage extends Vue {
  postData!: IPost;

  created(): void {
    // TODO: $route.params.id 가지고 서버에 글 데이터 가져오기

    // 아래는 테스트 데이터
    this.postData = {
      id: this.$route.params.id.toString(),
      postType: "general",
      createdAt: new Date(Date.now() - 100000),
      updatedAt: new Date(Date.now() - 80000),
      author: this.$store.state.loginState.userInfo,
      title: "테스트 글",
      contentPreview: "",
      contentFull: "<b>테스트 글</b> 입니다. 메렁",
      previewMainImageUrl: "https://picsum.photos/seed/post1/600/200",
      tags: ["Tag1", "태그2", "TAG3"],
      commentsCount: 10,
      comments: [{
        id: "comment111",
        createdAt: new Date(Date.now() - 60000),
        updatedAt: new Date(Date.now() - 60000),
        author: this.$store.state.loginState.userInfo,
        content: "테스트 댓글이에요\n\n혹시 집에 가는 방법에 대해 아시나요?\n\n집에 정말 가고 싶어요",
      }, {
        id: "comment222",
        createdAt: new Date(Date.now() - 60000),
        updatedAt: new Date(Date.now() - 60000),
        author: {
          id: "user-44332211",
          username: "지나가던사람",
          profileImageUrl: "https://picsum.photos/seed/two1/200",
        },
        content: "헉 유용한 정보에염!!",
      }],
      likesCount: 100,
      likes: [],
    };
  }

  mounted(): void {
    if (this.$route.hash && this.postData) {
      this.scrollTo(this.$route.hash);
    } else {
      this.scrollTo(0, { duration: 0 });
    }
  }

  scrollTo(target: VuetifyGoToTarget, options?: Partial<GoToOptions>): void {
    goTo(target, options);
  }

  get isPostUpdatedSincePublish() {
    return this.postData.createdAt.getTime() !== this.postData.updatedAt.getTime();
  }
}
</script>

<style lang="scss" scoped>
.post-image-darken-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.page-container {
  min-height: 100vh;
  background-color: #FAFBFB;
}

.tag {
  margin: 0.1em 0.33em;
  padding: 0.25em 0.75em;
  border-radius: 8px;
  color: white;
  background-color: #4AF;
  box-shadow: 0 0.15em 0.3em rgba(0, 0, 0, 0.25);
}
</style>
