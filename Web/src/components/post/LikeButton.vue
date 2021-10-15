<template>
  <v-btn :color="liked ? 'pink' : ''"
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

@Component
export default class LikeButton extends Vue {
  @Prop({ required: true }) postId!: string;
  @Prop({ default: false }) liked!: boolean;
  @Prop({ default: false }) count!: number;
  @Prop({ default: false }) descriptive!: boolean;

  get text(): string {
    if (this.descriptive) {
      return `좋아요 ${this.count} 개`;
    }

    return this.count.toString();
  }

  onClick(): void {
    new Promise<Record<string, any>>((resolve) => {
      // server communication logic here

      // 테스트용 가짜 처리
      setTimeout(() => {
        resolve({ // New like status
          id: this.postId,
          likedByAccount: !this.liked,
          likesCount: this.count + (this.liked ? -1 : 1),
        });
      }, Math.random() * 500 + 50);
    }).then((value) => {
      if (value.id === this.postId) {
        this.$emit("like-status-update", {
          likesCount: value.likesCount,
          likedByAccount: value.likedByAccount,
        });
      }
    });
  }
}
</script>
