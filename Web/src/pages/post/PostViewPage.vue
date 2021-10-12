<template>
  <v-responsive class="pb-8 page-container">
    <v-img :src="postData.previewMainImageUrl"
           dark
           width="100%"
           height="300px">
      <div class="post-image-darken-overlay"></div>

      <v-layout align-center justify-center fill-height class="mx-auto" style="max-width: 800px">
        <div class="text-h3 text-center">{{ postData.title }}</div>
      </v-layout>
    </v-img>

    <v-card width="95%" max-width="800px" elevation="8" class="mx-auto mt-n8 pa-2 pa-sm-8">
      <v-card-text v-html="postData.contentFull" class="text-body-1" style="color: rgba(0, 0, 0, 0.8)" />

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

      <v-divider class="my-4" />

      <v-layout wrap>
        <v-btn v-for="tag in postData.tags"
              :key="tag"
              outlined
              color="primary"
              class="ma-2">#{{ tag }}</v-btn>
      </v-layout>

      <v-divider class="my-4" />

      <v-card-actions>
        <v-layout class="mt-2 mb-4" row justify-space-between>
          <v-btn class="pa-0 px-2" text to="#comments"><v-icon class="mr-1">mdi-message-reply-text</v-icon> 댓글 {{ postData.commentsCount }}개</v-btn>
          <v-btn class="pa-0 px-2" text @click.stop.prevent="onLikeButtonClick"><v-icon class="mr-1">mdi-heart</v-icon> 좋아요 {{ postData.likesCount }}개</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
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
      comments: [],
      likesCount: 100,
      likes: [],
    };
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
