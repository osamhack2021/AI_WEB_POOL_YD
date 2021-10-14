<template>
  <v-container fluid>
    <!-- 포스트 로딩 영역 -->
    <v-layout v-if="!postLoaded" justify-center align-center class="pa-4">
      <v-progress-circular indeterminate />
      <span class="ml-2">글을 불러오는 중입니다...</span>
    </v-layout>
    <!-- -->

    <v-responsive v-else class="pb-8 page-container">
      <!-- 상단 메인 이미지 영역 -->
      <v-img :src="absolutePath(mainImageUrl)"
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
        <v-card-text v-html="postData.content" class="text-body-1" style="color: rgba(0, 0, 0, 0.8); line-height: 2" />
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

            <v-img :src="absolutePath(postData.author.profileImageUrl)"
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
          <v-layout row justify-space-between class="px-2">
            <v-btn class="pa-0 px-2" text @click.stop.prevent="scrollTo('#comments')"><v-icon class="mr-1">mdi-message-reply-text</v-icon> 댓글 {{ postData.commentsCount }}개</v-btn>
            <v-btn class="pa-0 px-2" text @click.stop.prevent="onLikeButtonClick"><v-icon class="mr-1">mdi-heart</v-icon> 좋아요 {{ postData.likesCount }}개</v-btn>
          </v-layout>
        </v-card-actions>
        <!-- -->

        <!-- 댓글 목록 영역 -->
        <v-container id="comments" class="pa-2">
          <v-list>
            <!-- 댓글 리스트 -->
            <v-list-item v-for="comment in postData.comments"
                        :key="comment.id">
              <v-list-item-avatar style="align-self: flex-start"><v-img :src="absolutePath(comment.author.profileImageUrl)" /></v-list-item-avatar>
              <v-list-item-content class="pt-2">
                <v-list-item-title>{{ comment.author.username }}</v-list-item-title>
                <v-list-item-subtitle style="white-space: pre-wrap">{{ comment.content }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- -->

            <v-divider class="my-2" />

            <!-- 댓글 작성 -->
            <v-list-item>
              <v-list-item-avatar style="align-self: flex-start"><v-img :src="absolutePath($store.state.loginState.userInfo.profileImageUrl)" /></v-list-item-avatar>
              <v-list-item-content class="pt-2">
                <v-list-item-title>댓글 남기기 <small>// {{ $store.state.loginState.userInfo.username }}</small></v-list-item-title>
                <v-list-item-subtitle class="py-2"><v-textarea v-model="leaveCommentTextareaContent" class="py-0 my-0" placeholder="글쓴이에게 하고싶은 말을 남겨보세요." rows="3" auto-grow hide-details no-resize /></v-list-item-subtitle>

                <v-layout>
                  <v-spacer />
                  <v-btn class="primary" :loading="leaveCommentProcessing" :disabled="leaveCommentProcessing" @click.stop.prevent="onLeaveCommentClick" >댓글 남기기</v-btn>
                </v-layout>
              </v-list-item-content>
            </v-list-item>
            <!-- -->
          </v-list>
        </v-container>
        <!-- -->
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import goTo from "vuetify/lib/services/goto";
import { GoToOptions, VuetifyGoToTarget } from "vuetify/types/services/goto.d";
import { IComment, IPost } from "@/interfaces/IDatabaseData";
import { absolutePath as backendAbsolutePath, get as backendGet } from "@/util/BackendHelper";

@Component
export default class PostViewPage extends Vue {
  absolutePath = backendAbsolutePath;

  postData: IPost | null = null;
  postLoaded = false;
  leaveCommentTextareaContent = "";
  leaveCommentProcessing = false;

  async created(): Promise<void> {
    const response = await backendGet(`/posts/full/${this.$route.params.id}`);

    if (response.status >= 400) {
      // REQUEST ERROR HANDLING
    } else {
      this.postData = response.data as IPost;
      this.postData.commentsCount = this.postData.comments.length;
      this.postData.likesCount = this.postData.likes.length;
      this.postData.createdAt = new Date(this.postData.createdAt);
      this.postData.updatedAt = new Date(this.postData.updatedAt);

      this.postLoaded = true;
    }
  }

  mounted(): void {
    if (this.$route.hash && this.postData) {
      this.scrollTo(this.$route.hash);
    } else {
      this.scrollTo(0, { duration: 0 });
    }
  }

  scrollTo(target: VuetifyGoToTarget, options?: Partial<GoToOptions>): void {
    goTo(target, {
      easing: "easeOutQuint",
      duration: 500,
      ...options,
    });
  }

  onLeaveCommentClick(): void {
    this.leaveCommentProcessing = true;

    // TODO: 서버 전송 파트

    // TODO: 서버에서 상태값과 IComment 받기

    setTimeout(() => { // 테스트용 (서버와의 통신 시뮬레이션)
      const createdComment: IComment = { // 테스트용; 서버가 리턴한 IComment를 사용할것
        id: Math.floor(Math.random() * 600000).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        author: this.$store.state.loginState.userInfo,
        content: this.leaveCommentTextareaContent, // 이 항목도 서버가 리턴한 것 그대로 써야됨
      };

      if (this.postData) {
        this.postData.comments.push(createdComment);
        this.postData.commentsCount = this.postData.comments.length;
      }

      // 클린업
      this.leaveCommentTextareaContent = "";
      this.leaveCommentProcessing = false;
    }, Math.floor(Math.random() * 1000) + 500);
  }

  get mainImageUrl(): string {
    return this.postData ? this.postData.previewMainImageUrl ?? "https://picsum.photos/id/1002/1600/900" : "https://picsum.photos/id/1002/1600/900";
  }

  get isPostUpdatedSincePublish(): boolean {
    if (this.postData) {
      return this.postData.createdAt.getTime() !== this.postData.updatedAt.getTime();
    }

    return false;
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
