<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link id="nav-title-text" :to="homeRouteUrl">{{ $store.state.appName }}</router-link>
      </v-toolbar-title>

      <v-spacer />

      <app-tab-navigation v-if="$store.state.loginState.loggedIn"
                          tabsPosition="right"
                          class="d-none d-sm-block" />

      <!-- # 비로그인 사용자용 네비바 아이콘 -->
      <app-non-login-account-menu v-if="!$store.state.loginState.loggedIn"
                                  :loginCallback="testLogin" />
      <!-- # -->

      <!-- # 로그인 사용자용 네비바 아이콘 -->
      <app-login-account-menu v-else
                              :logoutCallback="testLogout" />
      <!-- # -->
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation app class="d-sm-none">
      <app-tab-navigation :tabGrow="true" />
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { IUserDisplay } from "@/interfaces/IDatabaseData";
import AppTabNavigation from "@/components/app/AppTabNavigation.vue";
import AppNonLoginAccountMenu from "@/components/app/AppNonLoginAccountMenu.vue";
import AppLoginAccountMenu from "@/components/app/AppLoginAccountMenu.vue";

@Component({
  components: {
    AppTabNavigation,
    AppNonLoginAccountMenu,
    AppLoginAccountMenu,
  },
})
export default class App extends Vue {
  /* 앱 전역 $route 변경 감시 훅 */
  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(): void {
    // 로그인 상태에 따른 라우트
    //   - 비로그인 사용자는 랜딩페이지 이외 접근 권한이 없어
    //     회원가입 페이지(/register)를 제외한
    //     하위 페이지 접근 시도 시 무조건 랜딩페이지(/)로
    //     이동합니다.
    //   - 로그인 사용자는 주 페이지가 피드페이지(/feed)입니다.
    //     로그인 상태에서 랜딩페이지 접근 시도 시 피드페이지로
    //     이동합니다.
    if (!this.$store.state.loginState.loggedIn && (this.$route.path !== "/register" && this.$route.path !== "/")) {
      this.$router.replace("/");
    } else if (this.$store.state.loginState.loggedIn && this.$route.path === "/") {
      this.$router.replace("/feed");
    }
  }

  /* 앱 전역 created 훅 */
  created(): void {
    // 로그인 상태에 따른 라우트 설정을 한번 더 실행하여 "확인사살"합니다.
    this.onUrlChange();
  }

  /* homeRouteUrl 게더 */
  get homeRouteUrl(): string {
    // 네비바 제목 클릭 시 이동할 주 페이지 라우트를 로그인 상태에 따라 다르게 설정합니다.
    return this.$store.state.loginState.loggedIn ? "/feed" : "/";
  }

  testLogin(): void {
    const loginUserInfo: IUserDisplay = {
      id: "testId",
      username: "테스트 계정",
      profileImageUrl: "https://picsum.photos/200",
    };

    this.$store.dispatch("registerLoginState", loginUserInfo);
    this.$router.push("/feed");
  }

  testLogout(): void {
    this.$store.dispatch("unreigsterLoginState");
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
.v-app-bar > .v-toolbar__content {
  margin: auto;
  max-width: 800px;
}

.v-app-bar .v-tabs {
  width: auto !important;
}

.v-bottom-navigation {
  height: 72px !important;
}
</style>
