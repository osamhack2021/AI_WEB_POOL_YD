<template>
  <v-card>
    <v-toolbar class="blue-grey" dense dark elevation="2">
      <v-toolbar-title>피드에 간단한 글 올리기</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn text to="/composer" title="에디터로 글쓰기"><v-icon>mdi-open-in-new</v-icon><span class="ml-2 d-none d-sm-inline-block"> 에디터로 글쓰기</span></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- 타이틀 영역 -->
    <v-layout class="mt-0 ml-3" row align-center style="flex-wrap: nowrap">
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
    <post-compose-button :loading="composing"
                         :clickCallback="compose"
                         class="compose-button" />
    <v-btn class="primary compose-button"
           elevation="4"
           title="글 작성"
           @click="compose"
           :loading="composing"
           :disabled="composing"
           rounded
           fab
           icon
           dark>
      <v-icon>mdi-send</v-icon>
    </v-btn>
    <!-- -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PostComposeButton from "@/components/post/PostComposeButton.vue";

@Component({
  components: {
    PostComposeButton,
  },
})
export default class FeedCompose extends Vue {
  composing = false;

  compose(): void {
    /* TODO: 글 작성 업로드 로직 */
    this.composing = true;

    setTimeout(() => {
      this.composing = false;
      this.$emit("compose-success");
    }, Math.floor(Math.random() * 1000 + 500));
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
