<template>
  <v-card>
    <v-toolbar class="blue-grey" dense dark>
      <v-toolbar-title>피드에 간단한 글 올리기</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn text to="/composer"><v-icon class="mr-2">mdi-open-in-new</v-icon> 에디터로 글쓰기</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- 타이틀 영역 -->
    <v-layout class="mt-0 ml-3" row align-center>
      <img :src="$store.state.loginState.userInfo.profileImageUrl"
            class="elevation-2"
            style="width: 64px; border-radius: 100%;" />

      <v-layout column justify-start>
        <v-card-title class="pr-8"><v-text-field class="pt-0 mt-0 mb-2" placeholder="제목을 입력하세요." hide-details single-line /></v-card-title>
        <v-card-subtitle>By {{ $store.state.loginState.userInfo.username }}</v-card-subtitle>
      </v-layout>
    </v-layout>
    <!-- -->

    <!-- 콘텐츠(텍스트) 영역 -->
    <v-card-text>
      <v-textarea class="py-0 my-0" placeholder="간단한 내용을 입력하세요." auto-grow hide-details no-resize />

      <div class="my-2">이미지를 첨부하거나 문자 스타일을 사용하려면 <router-link to="/composer">에디터를 이용</router-link>해주세요.</div>
    </v-card-text>
    <!-- -->

    <!-- 작성 버튼 -->
    <v-btn class="primary compose-button"
           elevation="4"
           title="글 작성"
           @click="compose"
           :disabled="composing"
           rounded
           fab
           icon
           dark>
      <v-icon v-if="!composing">mdi-send</v-icon>
      <v-progress-circular v-else indeterminate />
    </v-btn>
    <!-- -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class FeedCompose extends Vue {
  composing = false;

  compose(): void {
    /* TODO: 글 작성 업로드 로직 */
    this.composing = true;

    setTimeout(() => { this.composing = false; }, Math.random() * 1000 + 500);
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  a {
    text-decoration: none;
  }

  .compose-button {
    position: absolute;
    right: 24px;
    margin-top: -28px;
    border-radius: 100%;
  }
}
</style>
