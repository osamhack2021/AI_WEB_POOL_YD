<template>
  <div class="d-flex flex-column">
    <!-- 피드 글 작성 영역 -->
    <feed-compose class="my-3"
                  @compose-success="refreshFeed" />
    <!-- -->

    <v-divider class="mt-8" />

    <!-- 피드 로딩 영역 -->
    <v-layout v-if="!feedLoadedFirstTime" justify-center align-center class="mt-8">
      <v-progress-circular indeterminate />
      <span class="ml-2">내 포스트를 불러오는 중입니다...</span>
    </v-layout>
    <!-- -->

    <!-- 피드 아이템 영역 -->
    <v-slide-y-reverse-transition>
      <v-container v-if="feedLoadedFirstTime">
        <div v-for="item in feedItems.slice().reverse()"
              :key="item.index"
              class="my-8">
          <v-lazy :options="{ threshold: 0.5 }" :min-height="!feedItemFiltered(item.postInfo.postType) ? '150px' : '0px'" transition="slide-y-reverse-transition">
            <feed-item v-if="!feedItemFiltered(item.postInfo.postType)"
                      :itemData="item" />
          </v-lazy>
        </div>
      </v-container>
    </v-slide-y-reverse-transition>
  </div>
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
export default class MyPagePosts extends Vue {
  feedItems: Array<IFeedItem> = new Array<IFeedItem>();
  feedLoaded = false;
  feedLoadedFirstTime = false;

  showPostType = "all";

  async created(): Promise<void> {
    /* 초기 피드 업데이트 */
    await this.refreshFeed();

    if (this.feedLoaded) this.feedLoadedFirstTime = this.feedLoaded;
    /* */
  }

  async updateFeedItems(): Promise<boolean> {
    const response = (await backendGet("posts/preview")).data as AxiosResponse<Array<IPostDisplay>>;

    const { data } = response;
    if (response.status >= 400) {
      return false;
    }

    // TODO: likedByAccount 구하는 로직 (현재 유저가 해당 post에 좋아요를 했는지)
    this.feedItems = new Array<IFeedItem>();

    data.forEach((postData) => {
      if (postData.author.id === this.$store.state.loginState.userInfo.id) {
        const newPostData = postData;
        newPostData.createdAt = new Date(postData.createdAt);

        this.feedItems.push({
          postInfo: newPostData,
          likedByAccount: false,
        });
      }
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

  feedItemFiltered(postType: string): boolean {
    if (this.showPostType === "all" || this.showPostType === postType) {
      return false;
    }

    return true;
  }
}
</script>
