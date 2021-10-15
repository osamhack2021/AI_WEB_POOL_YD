<template>
  <v-btn :to="useRoute ? { path: `/post/${postId}`, hash: 'comments' } : null"
         text
         class="pa-0 px-1">
    <v-icon class="mr-1">mdi-message-reply-text</v-icon> {{ text }}
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class CommentsButton extends Vue {
  @Prop({ required: true }) postId!: string;
  @Prop({ default: 0 }) count!: number;
  @Prop({ default: false }) descriptive!: boolean;
  @Prop({ required: false, default: false }) useRoute!: boolean;

  get text(): string {
    if (this.descriptive) {
      return `댓글 ${this.count} 개`;
    }

    return this.count.toString();
  }
}
</script>
