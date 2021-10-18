<template>
  <v-app>
    <v-expand-transition>
      <v-app-bar v-if="!$route.meta.appBarHide" :elevate-on-scroll="$route.meta.appBarElevateOnScroll" color="white" app light dense>
        <v-toolbar-title class="primary--text" style="font-weight: 900">
          <router-link id="nav-title-text" :to="homeRouteUrl">{{ $store.state.appName }}</router-link>
        </v-toolbar-title>

        <v-spacer />

        <!-- 탭 네비게이션 -->
        <app-tab-navigation v-if="$store.state.loginState.loggedIn"
                            tabsPosition="right"
                            class="d-none d-sm-block" />
        <!-- -->

        <!-- 로그인 사용자용 네비바 아이콘 -->
        <app-login-account-menu v-if="$store.state.loginState.loggedIn"
                                :logoutCallback="testLogout" />
        <!-- -->
      </v-app-bar>
    </v-expand-transition>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation v-if="$store.state.loginState.loggedIn" app class="d-sm-none">
      <app-tab-navigation :mobileMode="true" />
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import AppTabNavigation from "@/components/app/AppTabNavigation.vue";
import AppLoginAccountMenu from "@/components/app/AppLoginAccountMenu.vue";
import { absolutePath, post } from "@/util/BackendHelper";

@Component({
  components: {
    AppTabNavigation,
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
    const userInfo = this.$cookies.get("user");

    if (!this.$store.state.loginState.loggedIn && !userInfo && (this.$route.path !== "/register" && this.$route.path !== "/")) {
      this.$router.replace("/");
    } else if (this.$store.state.loginState.loggedIn && this.$route.path === "/") {
      this.$router.replace("/feed");
    } else if (!this.$store.state.loginState.loggedIn && this.$route.path === "/" && userInfo) {
      this.$store.dispatch("registerLoginState", userInfo);
      this.$router.replace("/feed");
    } else if (!this.$store.state.loginState.loggedIn && userInfo) {
      this.$store.dispatch("registerLoginState", userInfo);
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

  async realLogin(val: any): Promise<boolean> {
    try {
      const response = await post("auth/local", val);
      const { user, jwt }: { user: any, jwt: string } = response.data;
      const userInfo = {
        id: user.id,
        username: user.username,
        profileImageUrl: absolutePath(user.thumbnail.url),
      };
      this.$store.dispatch("registerLoginState", userInfo);
      /* set jwt in cookie */
      this.$cookies.set("jwt", jwt);
      this.$cookies.set("user", userInfo);
      this.$router.push("/feed");
      return true;
    } catch (e) {
      return false;
    }
  }

  testLogout(): void {
    this.$cookies.remove("jwt");
    this.$cookies.remove("user");
    this.$store.dispatch("unreigsterLoginState");
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
.v-app-bar {
  z-index: 10 !important;

  #nav-title-text {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      width: 100%;
      bottom: 0;
      background-color: currentColor;
      transform: scaleX(0);
      transition: transform 0.33s cubic-bezier(0, 0, 0, 1);
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  & > .v-toolbar__content {
    margin: auto;
    max-width: 800px;
  }

  .v-tabs {
    width: auto !important;
  }
}

.v-bottom-navigation {
  height: 72px !important;
}
</style>

<style lang="scss" scoped>
.container {
  padding: 0 !important;
}
</style>
