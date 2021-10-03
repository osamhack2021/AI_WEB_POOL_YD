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
        style="flex: 0 1 72rem"
      >
        <!-- 프로필 -->
        <my-page-profile
          class="profile"
          style="flex: 0 3 16em; height: 33rem; margin: 0 1rem"
        ></my-page-profile>
        <!-- 콘텐츠 (포스트, 기록) -->
        <div
          class="contents d-flex flex-column align-center"
          style="flex: 0 2 45rem; min-height: 10rem; margin: 0 1rem"
        >
          <!-- 콘텐츠 선택 탭 -->
          <div class="contents__tab pl-6" style="width: 100%; z-index: 1">
            <v-tabs v-model="tab" slider-size="4" :height="styles.tabHeight">
              <v-tab :ripple="false" class="d-flex align-start"> 포스트 </v-tab>
              <v-tab :ripple="false" class="d-flex align-start"> 기록 </v-tab>
            </v-tabs>
          </div>
          <!-- 콘텐츠 -->
          <v-tabs-items
            v-model="tab"
            class="contents__content mt-6"
            style="width: 60%; background: none"
          >
            <v-tab-item>
              <my-page-posts></my-page-posts>
            </v-tab-item>
            <v-tab-item>
              <my-page-credits></my-page-credits>
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
import MyPageProfile from "@/pages/account/MyPageProfile.vue";
import MyPagePosts from "@/pages/account/MyPagePosts.vue";
import MyPageRecords from "@/pages/account/MyPageRecords.vue";
import MyPageCredits from "@/pages/account/MyPageCredits.vue";

@Component({
  components: {
    MyPageProfile,
    MyPagePosts,
    MyPageRecords,
    MyPageCredits,
  },
})
export default class MyPage extends Vue {
  tab = 0;
  styles = {
    spacingHeight: "2rem",
    tabBackgroundHeight: "2rem",
    tabHeight: "2rem",
  };
}
</script>

<style lang="scss" scoped>
.tab-background {
  background: #fff;
  box-shadow: 0 4px 8px -4px rgba($color-black, 0.5);
}

.main-container {
  background: $color-sand-lighter;
}
</style>
