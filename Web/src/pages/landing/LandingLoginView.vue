<template>
  <login-form :loginCallback="realLogin"
              :demoLoginCallback="demoLogin" />
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

  demoLogin(): void {
    const demoUserInfo: IUserDisplay = {
      id: "demo_user",
      username: "오프라인 데모 사용자",
      department: "데모",
      profileImageUrl: "https://picsum.photos/seed/zero/300",
    };
    this.$store.dispatch("registerLoginState", demoUserInfo);
    this.$router.push("/feed");
  }
}
</script>
