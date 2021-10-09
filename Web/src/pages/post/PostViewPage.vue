<template>
  <v-responsive class="pb-8">
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

        <v-layout style="flex-grow: 0">
          <v-layout justify-end align-center>
            <div>written by <strong>{{ postData.author.username }}</strong></div>
          </v-layout>

          <img :src="postData.author.profileImageUrl"
              class="ml-3 elevation-2"
              style="width: 64px; border-radius: 100%" />
        </v-layout>
      </v-layout>
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
      createdAt: new Date(Date.now() - 100000),
      updatedAt: new Date(Date.now() - 80000),
      author: this.$store.state.loginState.userInfo,
      title: "테스트 글",
      contentPreview: "",
      contentFull: "<b>테스트 글</b> 입니다. 메렁",
      previewMainImageUrl: "https://picsum.photos/seed/post1/600/200",
      commentsCount: 10,
      comments: [],
      likesCount: 100,
      likes: [],
    };
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
</style>
