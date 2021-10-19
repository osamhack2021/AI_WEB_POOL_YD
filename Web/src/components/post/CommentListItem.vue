<template>
  <v-list-item>
    <v-list-item-avatar style="align-self: flex-start"><v-img :src="absolutePath(commentData.author.profileImageUrl)" /></v-list-item-avatar>
    <v-list-item-content class="pt-2">
      <v-list-item-title>
        <v-layout align-center>
          <span>{{ commentData.author.username }}</span>

          <v-layout v-if="commentData.author.id === $store.state.loginState.userInfo.id" align-center class="ml-2">
            <v-btn icon x-small class="mx-1" title="댓글 수정 (미구현 기능입니다.)" disabled><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon x-small class="mx-1" title="댓글 삭제" :disabled="isDeleting" :loading="isDeleting" @click.prevent="deleteComment"><v-icon>mdi-delete</v-icon></v-btn>
          </v-layout>
        </v-layout>
      </v-list-item-title>
      <v-list-item-subtitle style="white-space: pre-wrap">{{ commentData.content }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { AxiosResponse } from "axios";
import { IComment } from "@/interfaces/IDatabaseData";
import { absolutePath as backendAbsolutePath, del as backendDel } from "@/util/BackendHelper";

@Component
export default class CommentListItem extends Vue {
  absolutePath = backendAbsolutePath;

  @Prop() commentData!: IComment;
  isDeleting = false;

  async deleteComment(): Promise<void> {
    this.isDeleting = true;

    const response = await backendDel(`/comments/${this.commentData.id}`) as AxiosResponse<Record<string, any>>;

    if (response.status >= 400) {
      // ERROR HANDLING
    } else if (response.status < 400 && this.commentData.id === response.data.id) {
      this.$emit("comment-delete", response.data.id);
    }

    this.isDeleting = false;
  }
}
</script>
