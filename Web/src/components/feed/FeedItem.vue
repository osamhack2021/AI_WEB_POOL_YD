<template>
  <v-card hover ripple :to="{ path: `/article/${itemData.postInfo.id}` }" style="overflow: hidden">
    <!-- 타이틀 영역 -->
    <v-img v-if="articleHasMainImage"
           :src="itemData.postInfo.previewMainImageUrl"
           dark
           aspect-ratio="2.5"
           class="pa-3 align-end">
      <div class="feed-image-darken-overlay"></div>

      <v-layout class="mt-0 ml-0" row align-center>
        <img :src="itemData.postInfo.author.profileImageUrl"
              aspect-ratio="1"
              class="elevation-2"
              style="width: 64px; border-radius: 100%;" />

        <v-layout column justify-start>
          <v-card-title>{{ itemData.postInfo.title }}</v-card-title>
          <v-card-subtitle>By {{ itemData.postInfo.author.username }}</v-card-subtitle>
        </v-layout>
      </v-layout>
    </v-img>
    <v-layout v-else class="mt-0 ml-3" row align-center>
      <img :src="itemData.postInfo.author.profileImageUrl"
            class="elevation-2"
            style="width: 64px; border-radius: 100%;" />

      <v-layout column justify-start>
        <v-card-title>{{ itemData.postInfo.title }}</v-card-title>
        <v-card-subtitle>By {{ itemData.postInfo.author.username }}</v-card-subtitle>
      </v-layout>
    </v-layout>
    <!-- -->

    <!-- 콘텐츠(텍스트) 영역 -->
    <v-card-text class="feed-item-content" v-html="itemData.postInfo.contentPreview"></v-card-text>
    <!-- -->

    <!-- 카드 하단 영역 -->
    <v-card-actions>
      <v-layout class="pa-4" row justify-space-around>
        <v-btn class="pa-0 px-1" text :to="{ path: `/article/${itemData.postInfo.id}#comments` }"><v-icon class="mr-1">mdi-message-reply-text</v-icon> {{ itemData.postInfo.commentsCount }}</v-btn>
        <v-btn class="pa-0 px-1 mx-2" text :color="itemData.likedByAccount ? 'pink' : ''" @click.stop.prevent="onLikeButtonClick"><v-icon class="mr-1">mdi-heart</v-icon> {{ itemData.postInfo.likesCount }}</v-btn>
        <v-spacer />
        <span class="mx-2 text--disabled"><v-icon>mdi-clock-outline</v-icon> {{ uploadDateAgo }}</span>
      </v-layout>
    </v-card-actions>
    <!-- -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { format } from "timeago.js";
import { Prop } from "vue-property-decorator";
import IFeedItem from "@/interfaces/IFeedItem";

@Component
export default class FeedItem extends Vue {
  @Prop({ required: true }) itemData!: IFeedItem;
  recomputeIntervalId = -1;
  recomputeHack = false;

  mounted(): void {
    if (this.recomputeIntervalId === -1) {
      this.recomputeIntervalId = setInterval(() => {
        this.recomputeHack = !this.recomputeHack;
      }, 60 * 1000);
    }
  }

  unmounted(): void {
    if (this.recomputeIntervalId !== -1) {
      clearInterval(this.recomputeIntervalId);
      this.recomputeIntervalId = -1;
    }
  }

  get articleHasMainImage(): boolean {
    if (this.itemData.postInfo.previewMainImageUrl) {
      return true;
    }
    return false;
  }

  get uploadDateAgo(): string {
    // computed 속성을 강제로 업데이트하기 위한 편법입니다.
    //   1분마다 업데이트(mounted 함수 참조)되는 변수를 참조하는 것만으로
    //   computed 캐싱을 무시하고 재처리합니다.
    // eslint-disable-next-line no-unused-expressions
    this.recomputeHack;

    return format(this.itemData.postInfo.createdAt, "ko");
  }

  onLikeButtonClick(): void {
    new Promise<Record<string, any>>((resolve) => {
      // server communication logic here

      // 테스트용 가짜 처리
      setTimeout(() => {
        resolve({ // New like status
          index: this.itemData.postInfo.id,
          likedByAccount: !this.itemData.likedByAccount,
          likesCount: this.itemData.postInfo.likesCount + (this.itemData.likedByAccount ? -1 : 1),
        });
      }, Math.random() * 500 + 50);
    }).then((value) => {
      if (value.index === this.itemData.postInfo.id) {
        this.itemData = {
          postInfo: {
            ...this.itemData.postInfo,
            likesCount: value.likesCount,
          },
          likedByAccount: value.likedByAccount,
        };
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.v-card__title,
.v-card__subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-image-darken-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.33);
  z-index: -1;
}

.feed-item-content {
  max-height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
