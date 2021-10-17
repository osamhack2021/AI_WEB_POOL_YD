<template>
  <v-layout column align-start justify-center fill-height>
    <div class="text-h1 mb-6 blue--text" style="font-weight: 900">{{ $store.state.appName }}</div>
    <p class="text-h4 my-6" style="font-weight:700">국군 장병의 자기 계발과 취업 정보 습득을 한 곳에.<br>POOL에 흠뻑 빠져보세요.</p>

    <login-form :loginCallback="realLogin"
                class="pa-4"
                style="max-width: 25vw; min-width: 400px; flex-grow: 0" />
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LoginForm from "@/components/app/LoginForm.vue";
import { IUserDisplay } from "@/interfaces/IDatabaseData";
import { absolutePath, post } from "@/util/BackendHelper";

@Component({
  components: {
    LoginForm,
  },
})
export default class LandingLoginView extends Vue {
  async realLogin(val: any): Promise<boolean> {
    try {
      const response = await post("auth/local", val);
      const { user, jwt }: { user: any, jwt: string } = response.data;
      const userInfo: IUserDisplay = {
        id: user.id,
        username: user.username,
        department: user.soldierData.department,
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
}
</script>
