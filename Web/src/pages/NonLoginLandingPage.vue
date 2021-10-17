<template>
  <v-container fluid>
    <v-img src="@/assets/images/landing.jpg"
           height="100vh"
           width="55vw"
           position="bottom"
           class="pa-2 align-end">
      <span class="white--text text-subtitle-2" style="opacity: 0.75">Photo by <a href="https://unsplash.com/photos/XnN42lsNv28">Simone Mascellari</a>, used under <a href="https://unsplash.com/license">Unsplash License</a>.</span>
    </v-img>

    <v-card class="landing-content-area pa-6 pa-sm-12">
      <v-layout column align-start justify-center fill-height>
        <div class="text-h2 mb-12 blue--text" style="font-weight: 900">{{ $store.state.appName }}</div>

        <login-form :loginCallback="realLogin"
                    class="pa-4"
                    style="max-width: 25vw; min-width: 300px; flex-grow: 0" />
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
a {
  color: currentColor !important;
}

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
