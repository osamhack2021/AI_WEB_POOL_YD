<template>
  <v-container fluid class="feed-container">
    <v-responsive class="mx-auto pa-2 px-sm-6" max-width="800px">
      <!-- 피드 글 작성 영역 -->
      <feed-compose class="my-3" />
      <!-- -->

      <v-divider class="mt-8" />

      <!-- 피드 로딩 영역 -->
      <v-layout v-if="!feedLoadedFirstTime" justify-center align-center class="mt-8">
        <v-progress-circular indeterminate />
        <span class="ml-2">피드를 불러오는 중입니다...</span>
      </v-layout>
      <!-- -->

      <!-- 피드 아이템 영역 -->
      <v-slide-y-reverse-transition>
        <v-container v-if="feedLoadedFirstTime">
          <v-layout align-center>
            <v-btn :loading="!feedLoaded"
                   :disabled="!feedLoaded"
                   text
                   color="primary"
                   @click="refreshFeed">
              <v-icon class="mr-2">mdi-refresh</v-icon> 새로 고치기
            </v-btn>
            <v-spacer />
            <v-radio-group v-model="showPostType" mandatory row hide-details class="pa-0 ma-0">
              <v-radio label="전체 보기" value="all" class="ma-2" />
              <v-radio label="일반 글만 보기" value="general" class="ma-2" />
              <v-radio label="채용 공고만 보기" value="recruition" class="ma-2" />
            </v-radio-group>
          </v-layout>

          <div v-for="item in feedItems.slice().reverse()"
               :key="item.index"
               class="my-8">
            <v-lazy :options="{ threshold: 0.5 }" min-height="0px" transition="slide-y-reverse-transition">
              <feed-item v-if="showPostType === 'all' || showPostType === item.postInfo.postType"
                        :itemData="item" />
            </v-lazy>
          </div>
        </v-container>
      </v-slide-y-reverse-transition>
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
  feedLoadedFirstTime = false;
  feedAutoRefreshIntervalId = -1;

  showPostType = "all";

  async created(): Promise<void> {
    /* 초기 피드 업데이트 */
    await this.refreshFeed();

    if (this.feedLoaded) this.feedLoadedFirstTime = this.feedLoaded;
    /* */
  }

  mounted(): void {
    /* 자동 피드 업데이트 Interval 등록 */
    if (this.feedAutoRefreshIntervalId === -1) {
      this.feedAutoRefreshIntervalId = setInterval(async () => {
        await this.refreshFeed();
      }, 30000);
    }
    /* */
  }

  unmounted(): void {
    if (this.feedAutoRefreshIntervalId !== -1) {
      clearInterval(this.feedAutoRefreshIntervalId);
      this.feedAutoRefreshIntervalId = -1;
    }
  }

  async updateFeedItems(): Promise<boolean> {
    const response = await backendGet("/posts/preview") as AxiosResponse<{data: Array<IPostDisplay>}>;

    if (response.status >= 400) {
      return false;
    }

    // TODO: likedByAccount 구하는 로직 (현재 유저가 해당 post에 좋아요를 했는지)
    response.data.data.forEach((postData) => {
      const newPostData = postData;
      newPostData.createdAt = new Date(postData.createdAt);

      this.feedItems.push({
        postInfo: newPostData,
        likedByAccount: false,
      });
    });

    return true;
  }

  async refreshFeed(): Promise<void> {
    this.feedLoaded = false;

    const feedUpdateStatus = await this.updateFeedItems();

    if (!feedUpdateStatus) {
      // FEED UPDATE ERROR HANDLING
    } else {
      this.feedLoaded = feedUpdateStatus;
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
