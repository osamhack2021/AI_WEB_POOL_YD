<template>
  <v-container fluid class="feed-container">
    <v-responsive class="mx-auto pa-2 px-sm-6" max-width="800px">
      <!-- 피드 글 작성 영역 -->
      <feed-compose class="my-3" />
      <!-- -->

      <v-divider class="my-8" />

      <!-- 피드 로딩 영역 -->
      <v-layout v-if="!feedLoaded" justify-center align-center>
        <v-progress-circular indeterminate />
        <span class="ml-2">피드를 불러오는 중입니다...</span>
      </v-layout>
      <!-- -->

      <!-- 피드 아이템 영역 -->
      <feed-item v-for="item in feedItems.slice().reverse()"
        class="my-8"
        :key="item.index"
        :itemData="item" />
      <!-- -->
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AxiosResponse } from "axios";
import FeedItemComponent from "@/components/feed/FeedItem.vue";
import FeedComposeComponent from "@/components/feed/FeedCompose.vue";
import IFeedItem from "@/interfaces/IFeedItem";
import { IPostDisplay } from "@/interfaces/IDatabaseData";
import { get as backendGet } from "@/util/BackendHelper";

@Component({
  components: {
    FeedItem: FeedItemComponent,
    FeedCompose: FeedComposeComponent,
  },
})
export default class MainFeedPage extends Vue {
  feedItems: Array<IFeedItem> = new Array<IFeedItem>();
  feedLoaded = false;

  async created(): Promise<void> {
    const response = await backendGet("/posts/preview") as AxiosResponse<{data: Array<IPostDisplay>}>;

    if (response.status >= 400) {
      // REQUEST ERROR HANDLING
    } else {
      // TODO: likedByAccount 구하는 로직 (현재 유저가 해당 post에 좋아요를 했는지)
      response.data.data.forEach((postData) => {
        const newPostData = postData;
        newPostData.createdAt = new Date(postData.createdAt);

        this.feedItems.push({
          postInfo: newPostData,
          likedByAccount: false,
        });
      });

      this.feedLoaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-container {
  background-color: #FAFBFB;
  min-height: 100%;
}
</style>
