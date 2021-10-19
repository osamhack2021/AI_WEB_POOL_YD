<template>
  <div class="composer">
    <v-text-field label="제목" v-model="editorTitle"></v-text-field>
    <vue-simplemde
      v-model="editorContent"
      class="editor"
      ref="markdownEditor"
      :configs="{ spellChecker: false }"
    />
    <v-btn
      class="primary"
      elevation="4"
      title="글 작성"
      @click="onCompose"
      :loading="composing"
      :disabled="composing"
      rounded
      fab
      icon
      dark
      >
      <v-icon v-if="composeDone">mdi-send</v-icon>
      <v-icon v-else>mdi-send</v-icon>
      </v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueSimplemde from "vue-simplemde";
import marked from "marked";
import { AxiosResponse } from "axios";
import { post as backendPost } from "@/util/BackendHelper";

@Component({
  components: {
    VueSimplemde,
  },
})
export default class PostComposePage extends Vue {
  editorContent = "";
  editorTitle = "";

  get renderedEditorContent() {
    return marked(this.editorContent);
  }

  composing = false;
  composeDone = false;

  async onCompose(): Promise<void> {
    this.composing = true;

    if (this.editorContent) {
      const response = await backendPost("posts", {
        title: this.editorTitle,
        content: this.editorContent,
        author: this.$store.state.loginState.userInfo.id,
        postType: "general",
      }) as AxiosResponse<Record<string, any>>;

      this.composing = false;

      if (response.status >= 400) {
        // ERROR HANDLING
        console.log("error occurred");
        console.log(response);
      } else {
        const responsePost = response.data;
        this.composeDone = true;
        setTimeout(() => {
          this.$router.push(`/post/${responsePost.id}`);
        }, 1000);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~simplemde/dist/simplemde.min.css";

.composer {
  height: calc(100vh - 48px);
  width: 100%;
  padding: 2rem;
}

.editor {
  &::v-deep .CodeMirror {
    height: 65vh;
  }
}
</style>
