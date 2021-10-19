<template>
  <v-container fluid>
    <!-- 포스트 로딩 영역 -->
    <v-layout v-if="!postLoaded" justify-center align-center class="pa-4">
      <v-progress-circular indeterminate />
      <span class="ml-2">글을 불러오는 중입니다...</span>
    </v-layout>
    <!-- -->

    <v-responsive v-if="postLoaded" class="pb-8 page-container">
      <!-- 상단 메인 이미지 영역 -->
      <v-slide-y-reverse-transition>
        <v-img v-if="postLoadedTransitionStep1"
               :src="absolutePath(mainImageUrl)"
               dark
               width="100%"
               height="300px">
          <div class="post-image-darken-overlay"></div>

          <v-layout align-center justify-center fill-height class="mx-auto" style="max-width: 800px">
            <div class="text-h3 text-center">{{ postData.title }}</div>
          </v-layout>
        </v-img>
      </v-slide-y-reverse-transition>
      <!-- -->

      <v-slide-y-reverse-transition>
        <v-card v-if="postLoadedTransitionStep2" width="95%" max-width="800px" elevation="8" class="mx-auto mt-n8 pa-2 pa-sm-8">
          <!-- 글 컨텐츠 영역 -->
          <v-card-text v-html="postData.content" class="text-body-1" style="color: rgba(0, 0, 0, 0.8); line-height: 2" />
          <!-- -->

          <!-- 작성자/글 관리 영역 -->
          <v-layout column class="mt-8 pa-2">
            <v-layout>
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

            <!-- 글 관리 영역 -->
            <v-layout v-if="postOwnedByAccount" class="mt-2">
              <v-spacer />

              <v-btn :disabled="deletePostProcessing"
                     :loading="deletePostProcessing"
                     @click="deletePost"
                     text
                     small
                     color="rgba(0, 0, 0, 0.75)"
                     class="pa-2">
                <v-icon>mdi-delete</v-icon> 글 삭제
              </v-btn>
            </v-layout>
            <!-- -->
          </v-layout>
          <!-- -->

          <v-divider class="my-4" />

          <!-- 태그 영역 -->
          <v-layout v-if="postData.postType === 'recruition'" wrap>
            <v-btn v-for="tag in postData.tags"
                  :key="tag"
                  outlined
                  color="primary"
                  class="ma-2">#{{ tag }}</v-btn>
          </v-layout>

          <v-divider v-if="postData.postType === 'recruition'" class="my-4" />
          <!-- -->

          <!-- 리액션 버튼 영역 -->
          <v-card-actions>
            <v-layout row justify-space-between class="px-2">
              <comments-button :postId="postData.id" :count="postData.commentsCount" :descriptive="true" />
              <like-button :postId="postData.id" :liked="postLikedByAccount" :count="postData.likesCount" :descriptive="true" @like-status-update="likeStatusUpdated" />
            </v-layout>
          </v-card-actions>
          <!-- -->

          <!-- 댓글 목록 영역 -->
          <v-container id="comments" class="pa-2">
            <v-list>
              <v-slide-x-reverse-transition group>
                <!-- 댓글 리스트 -->
                <comment-list-item v-for="comment in postData.comments"
                                   :key="comment.id"
                                   :commentData="comment"
                                   @comment-delete="onCommentDelete" />
                <!-- -->
              </v-slide-x-reverse-transition>

              <v-divider class="my-2" />

              <!-- 댓글 작성 -->
              <v-list-item>
                <v-list-item-avatar style="align-self: flex-start"><v-img :src="absolutePath($store.state.loginState.userInfo.profileImageUrl)" /></v-list-item-avatar>
                <v-list-item-content class="pt-2">
                  <v-list-item-title>댓글 남기기 <small>// {{ $store.state.loginState.userInfo.username }}</small></v-list-item-title>
                  <v-list-item-subtitle class="py-2">
                    <v-textarea v-model="leaveCommentTextareaContent"
                                :placeholder="'글쓴이에게 하고싶은 말을 남겨보세요.\nCtrl+Enter 키 조합으로 댓글을 작성할 수 있습니다.'"
                                @keypress.ctrl.enter="onLeaveCommentClick"
                                @input="leaveCommentErrorMessage = ''"
                                class="py-0 my-0"
                                rows="3"
                                auto-grow
                                hide-details
                                no-resize />
                  </v-list-item-subtitle>

                  <v-layout align-center>
                    <v-spacer />
                    <v-slide-x-transition>
                      <span v-if="leaveCommentErrorMessage" class="error--text mr-2">{{ leaveCommentErrorMessage }}</span>
                    </v-slide-x-transition>
                    <v-btn class="primary" :loading="leaveCommentProcessing" :disabled="leaveCommentProcessing" @click.stop.prevent="onLeaveCommentClick">댓글 남기기</v-btn>
                  </v-layout>
                </v-list-item-content>
              </v-list-item>
              <!-- -->
            </v-list>
          </v-container>
          <!-- -->
        </v-card>
      </v-slide-y-reverse-transition>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import goTo from "vuetify/lib/services/goto";
import delay from "delay";
import { AxiosResponse } from "axios";
import { GoToOptions, VuetifyGoToTarget } from "vuetify/types/services/goto.d";
import CommentsButton from "@/components/post/CommentsButton.vue";
import LikeButton from "@/components/post/LikeButton.vue";
import CommentListItem from "@/components/post/CommentListItem.vue";
import { IComment, IPost } from "@/interfaces/IDatabaseData";
import {
  absolutePath as backendAbsolutePath, get as backendGet, post as backendPost, del as backendDel,
} from "@/util/BackendHelper";

@Component({
  components: {
    CommentsButton,
    LikeButton,
    CommentListItem,
  },
})
export default class PostViewPage extends Vue {
  absolutePath = backendAbsolutePath;

  postData: IPost | null = null;
  postLoaded = false;
  postLoadedTransitionStep1 = false;
  postLoadedTransitionStep2 = false;
  postLikedByAccount = false;
  postOwnedByAccount = false;
  leaveCommentTextareaContent = "";
  leaveCommentErrorMessage = "";
  leaveCommentProcessing = false;
  deletePostProcessing = false;

  async created(): Promise<void> {
    await this.updatePostData();

    this.postLoaded = true;

    await delay(100);
    this.postLoadedTransitionStep1 = true;
    await delay(100);
    this.postLoadedTransitionStep2 = true;
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

  likeStatusUpdated(value: { likesCount: number, likedByAccount: boolean }): void {
    if (this.postData) {
      this.postData.likesCount = value.likesCount;
      this.postLikedByAccount = value.likedByAccount;
    }
  }

  async onLeaveCommentClick(): Promise<void> {
    this.leaveCommentProcessing = true;

    if (this.postData && this.leaveCommentTextareaContent) {
      const response = await backendPost("/comments", {
        content: this.leaveCommentTextareaContent,
        author: this.$store.state.loginState.userInfo.id,
        post: this.postData.id,
      }) as AxiosResponse<Record<string, any>>;

      if (response.status >= 400) {
        // ERROR HANDLING
      } else {
        const responseComment = response.data;
        const newComment: IComment = {
          id: responseComment.id,
          createdAt: new Date(responseComment.createdAt),
          updatedAt: new Date(responseComment.updatedAt),
          content: responseComment.content,
          author: {
            id: responseComment.author.id,
            username: responseComment.author.username,
            profileImageUrl: backendAbsolutePath(responseComment.author.thumbnail.url),
          },
        };

        this.postData.comments.push(newComment);
        this.postData.commentsCount = this.postData.comments.length;
      }
    } else if (!this.leaveCommentTextareaContent) {
      this.leaveCommentErrorMessage = "댓글 내용이 없습니다.";
    }

    // 클린업
    this.leaveCommentTextareaContent = "";
    this.leaveCommentProcessing = false;
  }

  async updatePostData(): Promise<void> {
    const response = await backendGet(`/posts/full/${this.$route.params.id}`);

    if (response.status >= 400) {
      // REQUEST ERROR HANDLING
    } else {
      const newPostData = response.data as IPost;
      newPostData.commentsCount = newPostData.comments.length;
      newPostData.likesCount = newPostData.likes.length;
      newPostData.createdAt = new Date(newPostData.createdAt);
      newPostData.updatedAt = new Date(newPostData.updatedAt);
      this.postLikedByAccount = (newPostData.likes.find((e) => e.id === this.$store.state.loginState.userInfo.id) && true) ?? false;
      this.postOwnedByAccount = newPostData.author.id === this.$store.state.loginState.userInfo.id;

      this.postData = newPostData;
    }
  }

  async deletePost(): Promise<void> {
    this.deletePostProcessing = true;

    const response = await backendDel(`/posts/${this.$route.params.id}`) as AxiosResponse<Record<string, any>>;

    if (response.status >= 400) {
      // REQUEST ERROR HANDLING
    } else if (response.status < 400 && (response.data.id === this.$route.params.id)) {
      this.$router.replace("/feed");
    }

    this.deletePostProcessing = false;
  }

  onCommentDelete(id: string): void {
    if (this.postData) {
      this.postData.comments = this.postData.comments.filter((e) => e.id !== id);
      this.postData.commentsCount = this.postData.comments.length;
    }
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
