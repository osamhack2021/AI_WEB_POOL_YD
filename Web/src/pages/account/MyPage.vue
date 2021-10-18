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
                  :inputLabels="CreditsData.inputLabels"
                  :summaryNumbers="CreditsData.summaryNumbers"
                  :cardContentsList="CreditsData.cardContentsList"
                  :isLastInputNumber="CreditsData.isLastInputNumber"
                  :kind="CreditsData.kind"
                  @create="handleCreate"
                  @delete="handleDelete"
                ></my-page-records>
                <my-page-records
                  style="flex: 0 1 48%"
                  class="official-records"
                  :inputLabels="AwardsData.inputLabels"
                  :summaryNumbers="AwardsData.summaryNumbers"
                  :cardContentsList="AwardsData.cardContentsList"
                  :isLastInputNumber="AwardsData.isLastInputNumber"
                  :kind="AwardsData.kind"
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
import { AxiosResponse } from "axios";
import MyPageProfile from "@/pages/account/MyPageProfile.vue";
import MyPagePosts from "@/pages/account/MyPagePosts.vue";
import MyPageRecords from "@/pages/account/MyPageRecords.vue";
import {
  get as backendGet, post as backendPost, put, del,
} from "@/util/BackendHelper";
import type { IRecordsComponentProps } from "./IRecordsData";
import { testDataAwards, testDataCredits } from "./RecordsTestData";

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

  AwardsData: IRecordsComponentProps = testDataAwards;
  CreditsData: IRecordsComponentProps = testDataCredits;

  profileData = {
    id: "",
    soldierData: {
      id: "",
      experiences: [{}],
    },
    followers: [],
    followings: [],
    thumbnail: "",
  };

  tab = 0;

  updateRecordsData(soldierData: any) {
    /* do sth with profileData */
    const awards = soldierData.experiences.filter((el: any) => el.type === "prize");
    const credits = soldierData.experiences.filter((el: any) => el.type === "points");
    let creditsSum = 0;
    const Awards = awards.map((el: any) => {
      console.log(el);
      return {
        id: el.id,
        date: el.date,
        location: el.location,
        title: el.title,
        value: el.value,
      };
    });
    const Credits = credits.map((el: any) => {
      creditsSum += parseInt(el.value, 10);
      return {
        id: el.id,
        date: el.date,
        location: el.location,
        title: el.title,
        value: `${el.value}점`,
      };
    });
    this.AwardsData = {
      ...this.AwardsData,
      cardContentsList: Awards,
      summaryNumbers: [
        {
          label: "개수",
          value: Awards.length,
          color: "blue",
        },
      ],
    };
    this.CreditsData = {
      ...this.CreditsData,
      cardContentsList: Credits,
      summaryNumbers: [
        {
          label: "가점",
          value: creditsSum,
          color: "blue",
        },
        {
          label: "감점",
          value: 0,
          color: "red",
        },
      ],
    };
  }

  async handleCreate(e: Record<string, unknown>) :Promise<void> {
    const { soldierData } = this.profileData;
    const exp: any[] = soldierData.experiences;
    /* give immediate change */
    exp.push(e);
    this.updateRecordsData(soldierData);
    /* update user data */
    const response = await backendPost("/experiences", e) as AxiosResponse<{data: Array<unknown>}>;
    const { data } = response;
    exp.pop();
    exp.push(data);
    this.updateRecordsData(soldierData);
    this.profileData = {
      ...this.profileData,
      soldierData,
    };
    put(`soldier-data/${soldierData.id}`, soldierData);
  }

  handleDelete(id: number):void {
    const { soldierData } = this.profileData;
    let exp: any[] = soldierData.experiences;
    /* give immediate change */
    exp = exp.filter((el) => el.id !== id);
    const soldierData2 = {
      ...soldierData,
      experiences: exp,
    };
    this.updateRecordsData(soldierData2);
    this.profileData = {
      ...this.profileData,
      soldierData: soldierData2,
    };

    /* delete experience */
    del(`experiences/${id}`);
  }

  async created(): Promise<void> {
    if (this.$route.params.id) {
      const response = await backendGet(`/users/${this.$route.params.id}`);

      if (response.status >= 400) {
        // ERROR HANDLING
      } else {
        this.profileData = response.data;
        console.log(this.profileData);
        const { data }: { data: any } = response;
        const response2 = await backendGet(`soldier-data/${data.soldierData.id}`);
        if (response2.status >= 400) {
          // error
        } else {
          const data2 = response2.data;
          this.profileData = {
            ...data,
            soldierData: data2,
          };
          this.updateRecordsData(data2);
        }
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
