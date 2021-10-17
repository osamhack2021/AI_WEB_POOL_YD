<template>
  <v-app>
    <div class="spacing-bar" :style="{ height: styles.spacingHeight }"></div>
    <!-- profile & contents와 겹치는, contents 선택 탭의 배경 -->
    <div
      class="tab-background"
      style="position: sticky; top: 64px; width: 100vw"
      :style="{ height: styles.tabBackgroundHeight }"
    ></div>
    <div class="main-container d-flex justify-center align-start">
      <div
        class="mypage-container d-flex justify-space-between"
        style="flex: 0 1 72rem; height: 200rem"
        :style="{ position: 'relative', top: '-' + styles.tabBackgroundHeight }"
      >
        <!-- 프로필 -->
        <my-page-profile
          class="profile"
          style="flex: 0 1 16rem; height: 33rem; margin: 0 1rem"
          :profileData="profileData"
        ></my-page-profile>
        <!-- 콘텐츠 (포스트, 기록) -->
        <div
          class="contents d-flex flex-column align-center"
          style="flex: 0 1 48rem; min-height: 10rem; margin: 0 1rem"
        >
          <!-- 콘텐츠 선택 탭 -->
          <div
            class="contents__tab"
            style="width: 100%; z-index: 3; position: sticky; top: 64px"
          >
            <v-tabs v-model="tab" slider-size="4" :height="styles.tabHeight">
              <v-tab :ripple="false" class=""> 포스트 </v-tab>
              <v-tab :ripple="false" class=""> 기록 </v-tab>
            </v-tabs>
          </div>
          <!-- 콘텐츠 -->
          <v-tabs-items
            v-model="tab"
            class="contents__content mt-16"
            style="width: 100%; background: none"
          >
            <!-- 포스트 -->
            <v-tab-item>
              <my-page-posts></my-page-posts>
            </v-tab-item>
            <!-- 공적기록 -->
            <v-tab-item>
              <div class="d-flex justify-space-between align-start">
                <my-page-records
                  style="flex: 0 1 48%"
                  class="official-records"
                  :inputLabels="testDataCredits.inputLabels"
                  :summaryNumbers="testDataCredits.summaryNumbers"
                  :cardContentsList="testDataCredits.cardContentsList"
                  :isLastInputNumber="testDataCredits.isLastInputNumber"
                  :kind="testDataCredits.kind"
                  @create="handleCreate"
                  @delete="handleDelete"
                ></my-page-records>
                <my-page-records
                  style="flex: 0 1 48%"
                  class="official-records"
                  :inputLabels="testDataAwards.inputLabels"
                  :summaryNumbers="testDataAwards.summaryNumbers"
                  :cardContentsList="testDataAwards.cardContentsList"
                  :isLastInputNumber="testDataAwards.isLastInputNumber"
                  :kind="testDataAwards.kind"
                  @create="handleCreate"
                  @delete="handleDelete"
                ></my-page-records>
              </div>
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
import { IUser } from "@/interfaces/IDatabaseData";
import { get as backendGet } from "@/util/BackendHelper";
import type { IRecordsComponentProps } from "./IRecordsData";
import { testDataAwards, testDataCredits } from "./RecordsTestData";

interface IProfileData {
  soldierData: Record<string, unknown>,
  followers: Array<IUser>,
  followings: Array<IUser>,
  thumbnail: Record<string, unknown>,
}

@Component({
  components: {
    MyPageProfile,
    MyPagePosts,
    MyPageRecords,
  },
})
export default class MyPage extends Vue {
  styles = {
    spacingHeight: "1.5rem",
    tabBackgroundHeight: "2.5rem",
    tabHeight: "2.5rem",
  };

  testDataAwards: IRecordsComponentProps = testDataAwards;
  testDataCredits: IRecordsComponentProps = testDataCredits;

  profileData: IProfileData = {
    soldierData: {},
    followers: [],
    followings: [],
    thumbnail: {},
  };

  tab = 0;

  handleCreate(e: unknown): void {
    console.log(e);
    /* { kind: ..., date: ..., location: ..., title: ..., value: ... } */
    /* create new experience & update sodilerData / user */
  }

  handleDelete(id: number): void {
    console.log(id);
    /* delete experience */
  }

  async created(): Promise<void> {
    if (this.$route.params.id) {
      const response = await backendGet(`/users/${this.$route.params.id}`);

      if (response.status >= 400) {
        // ERROR HANDLING
      } else {
        this.profileData = response.data as IProfileData;
      }
    } else {
      // 임시 로그인 대응용 (추후 삭제 예정)
      const response = await backendGet("/users/61616d97ba6b751e2cde287d");

      if (response.status >= 400) {
        // ERROR HANDLING
      } else {
        this.profileData = response.data as IProfileData;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-background {
  background: #fff;
  box-shadow: 0 4px 8px -4px rgba($color-black, 0.5);
  z-index: 2;
}

.main-container {
  background: $color-sand-lighter;
}

.official-records {
  flex: 0 1 25rem;
}
</style>
