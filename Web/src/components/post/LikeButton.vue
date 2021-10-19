<template>
  <v-btn :color="liked ? 'pink' : ''"
         :disabled="isLikeProcessing"
         :loading="isLikeProcessing"
         @click.stop.prevent="onClick"
         text
         class="pa-0 px-1">
    <v-icon class="mr-1">mdi-heart</v-icon> {{ text }}
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { AxiosResponse } from "axios";
import { get as backendGet, put as backendPut } from "@/util/BackendHelper";
import { IPost } from "@/interfaces/IDatabaseData";

@Component
export default class LikeButton extends Vue {
  @Prop({ required: true }) postId!: string;
  @Prop({ default: false }) liked!: boolean;
  @Prop({ default: false }) count!: number;
  @Prop({ default: false }) descriptive!: boolean;
  isLikeProcessing = false;

  get text(): string {
    if (this.descriptive) {
      return `좋아요 ${this.count} 개`;
    }

    return this.count.toString();
  }

  async onClick(): Promise<void> {
    this.isLikeProcessing = true;

    const postData = await backendGet(`/posts/${this.postId}`) as AxiosResponse<IPost>;
    let newPostLikes = postData.data.likes;

    if (this.liked) {
      newPostLikes = newPostLikes.filter((e) => e.id !== this.$store.state.loginState.userInfo.id);
    } else {
      newPostLikes.push(this.$store.state.loginState.userInfo);
    }

    const newPostLikesUserIds = [...new Set(newPostLikes.map((e) => e.id))];

    const response = await backendPut(`/posts/${this.postId}`, {
      likes: newPostLikesUserIds,
    }) as AxiosResponse<IPost>;

    if (response.status >= 400) {
      // ERROR HANDLING
    } else {
      const newState = response.data.likes.find((e) => e.id === this.$store.state.loginState.userInfo.id) && true;

      this.$emit("like-status-update", {
        likesCount: response.data.likes.length,
        likedByAccount: newState,
      });
    }

    this.isLikeProcessing = false;
  }
}
</script>
