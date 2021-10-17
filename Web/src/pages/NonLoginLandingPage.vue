<template>
  <v-container fluid>
    <v-img src="@/assets/images/landing.jpg"
           height="100vh"
           width="55vw"
           position="bottom" />

    <v-card class="landing-content-area pa-6">
      <v-layout align-center justify-start fill-height>
        <login-form :loginCallback="realLogin"
                    class="pa-4"
                    style="max-width: 25vw; min-width: 300px" />
      </v-layout>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LoginForm from "@/components/app/LoginForm.vue";
import { absolutePath, post } from "@/util/BackendHelper";

@Component({
  components: {
    LoginForm,
  },
})
export default class NonLoginLandingPage extends Vue {
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
}
</script>

<style lang="scss" scoped>
.landing-content-area {
  position: fixed;
  right: 0;
  top: 0;
  width: 50vw;
  height: 100vh;
  font-size: 1.5em;
  border-radius: 5vw 0 0 5vw !important;
}
</style>
