<template>
  <v-app>
    <div class="spacing-bar" :style="{ height: styles.spacingHeight }"></div>
    <!-- profile & contents와 겹치는, contents 선택 탭의 배경 -->
    <div
      class="tab-background"
      style="position: absolute; width: 100%"
      :style="{ top: styles.spacingHeight, height: styles.tabBackgroundHeight }"
    ></div>
    <div class="main-container d-flex justify-center">
      <div
        class="mypage-container d-flex justify-space-between"
        style="flex: 0 1 75rem"
      >
        <!-- 프로필 -->
        <div
          class="profile-container d-flex flex-column align-center"
          style="flex: 0 1 24rem"
        >
          <my-page-profile></my-page-profile>
        </div>
        <!-- 콘텐츠 (포스트, 기록) -->
        <div
          class="contents-container d-flex flex-column align-center"
          style="min-height: 10rem; flex: 0 1 48rem"
        >
          <div class="contents__tab pl-10" style="width: 100%; z-index: 1">
            <v-tabs v-model="tab" slider-size="4" :height="styles.tabHeight">
              <v-tab :ripple="false" class="d-flex align-start"> 포스트 </v-tab>
              <v-tab :ripple="false" class="d-flex align-start"> 기록 </v-tab>
            </v-tabs>
          </div>
          <v-tabs-items class="contents__post" v-model="tab">
            <v-tab-item>
              <my-page-posts></my-page-posts>
            </v-tab-item>
            <v-tab-item>
              <my-page-records></my-page-records>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MyPageProfile from "./MyPageProfile.vue";
import MyPagePosts from "./MyPagePosts.vue";
import MyPageRecords from "./MyPageRecords.vue";

@Component({
  components: {
    MyPageProfile,
    MyPagePosts,
    MyPageRecords,
  },
})
export default class MyPage extends Vue {
  tab = null;
  styles = {
    spacingHeight: "2rem",
    tabBackgroundHeight: "2rem",
    tabHeight: "2rem",
  };
}
</script>

<style lang="scss">
.tab-background {
  background: #fff;
}

.main-container {
  background: $color-sand-lighter;
}
</style>
