<template>
  <v-container fluid class="compose-container">
    <v-responsive class="py-4">
      <v-slide-y-reverse-transition>
        <v-card v-if="pageLoaded" class="mx-auto px-8 py-6" style="max-width: 800px">
          <v-card-title class="text-h3"><v-icon x-large color="rgba(0, 0, 0, 0.87)" class="mr-2">mdi-pencil</v-icon> 글 에디터</v-card-title>
          <v-card-subtitle class="mt-2 text-subtitle-1"><a href="https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4">마크다운</a> 문법을 사용하여 글을 작성할 수 있습니다.</v-card-subtitle>

          <v-divider />

          <v-layout column class="mt-4">
            <v-layout row align-center class="ma-0 mb-4">
              <v-img :src="$store.state.loginState.userInfo.profileImageUrl"
                    width="48px"
                    height="48px"
                    style="border-radius: 100%; flex-grow: 0" />
              <v-text-field v-model="editorTitle"
                            :rules="[(value) => !!value || '제목을 입력해주세요.']"
                            @input="composeErrorMessage = ''"
                            autofocus
                            label="글 제목"
                            height="1.5em"
                            class="ml-3"
                            style="flex-grow: 1; font-weight: bold; font-size: 1.25em" />
            </v-layout>

            <vue-simplemde v-model="editorContent"
                           @input="composeErrorMessage = ''"
                           class="editor"
                           ref="markdownEditor"
                           :configs="{ spellChecker: false }" />

            <v-slide-x-reverse-transition>
              <v-alert v-if="!!composeErrorMessage" type="error" class="my-4">{{ composeErrorMessage }}</v-alert>
            </v-slide-x-reverse-transition>

            <v-layout class="ma-4">
              <v-spacer />
              <post-compose-button :descriptive="true"
                                   :loading="composing"
                                   :complete="composeDone"
                                   :clickCallback="onCompose"
                                   style="min-width: 150px" />
            </v-layout>
          </v-layout>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueSimplemde from "vue-simplemde";
import marked from "marked";
import { AxiosResponse } from "axios";
import PostComposeButton from "@/components/post/PostComposeButton.vue";
import { post as backendPost } from "@/util/BackendHelper";

@Component({
  components: {
    PostComposeButton,
    VueSimplemde,
  },
})
export default class PostComposePage extends Vue {
  pageLoaded = false;

  editorContent = "";
  editorTitle = "";

  get renderedEditorContent() {
    return marked(this.editorContent);
  }

  composing = false;
  composeErrorMessage = "";
  composeDone = false;

  mounted(): void {
    this.pageLoaded = true;
  }

  async onCompose(): Promise<void> {
    this.composing = true;
    this.composeDone = false;
    this.composeErrorMessage = "";

    if (!this.editorTitle) {
      this.composeErrorMessage = "글의 제목을 입력해주세요!";
    } else if (!this.editorContent) {
      this.composeErrorMessage = "글의 내용을 입력해주세요!";
    } else {
      const response = await backendPost("posts", {
        title: this.editorTitle,
        content: this.editorContent,
        author: this.$store.state.loginState.userInfo.id,
        postType: "general",
      }) as AxiosResponse<Record<string, any>>;

      if (response.status >= 400) {
        this.composeErrorMessage = `서버에 전송하는 중 오류가 발생했습니다.\n${response.status}: ${response.statusText}`;
      } else {
        const responsePost = response.data;
        this.composeDone = true;

        setTimeout(() => {
          this.$router.push(`/post/${responsePost.id}`);
        }, 2000);
      }
    }

    this.composing = false;
  }
}
</script>

<style lang="scss" scoped>
@import "~simplemde/dist/simplemde.min.css";

a {
  color: currentColor !important;
  text-decoration-color: currentColor !important;
}

.compose-container {
  min-height: 100vh;
  background-color: #FAFBFB;
}

.composer {
  height: calc(100vh - 48px);
  width: 100%;
  padding: 2rem;
}

.editor {
  &::v-deep{
    .CodeMirror {
      height: 65vh;
    }

    .CodeMirror-fullscreen {
      top: calc(48px + 50px);
    }

    .editor-toolbar.fullscreen {
      top: 48px;
    }
  }
}
</style>
