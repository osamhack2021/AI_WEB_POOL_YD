<template>
  <div class="composer">
    <v-text-field label="제목"></v-text-field>
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
      @click="compose"
      :loading="composing"
      :disabled="composing"
      rounded
      fab
      icon
      dark
      ><v-icon>mdi-send</v-icon></v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueSimplemde from "vue-simplemde";
import marked from "marked";

@Component({
  components: {
    VueSimplemde,
  },
})
export default class PostComposePage extends Vue {
  editorContent = "";

  get renderedEditorContent() {
    return marked(this.editorContent);
  }

  composing = false;

  compose(): void {
    /* TODO: 글 작성 업로드 로직 */
    this.composing = true;
    console.log(this.renderedEditorContent);
    setTimeout(() => {
      this.composing = false;
      this.$emit("compose-success");
    }, Math.random() * 1000 + 500);
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
