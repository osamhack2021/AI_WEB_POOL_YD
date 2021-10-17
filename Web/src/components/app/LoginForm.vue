<template>
  <v-layout column>
    <v-list-item-title class="mt-3 text-h6" style="align-self: flex-start">로그인</v-list-item-title>

    <v-form v-model="loginFormValidated" class="mt-4" @submit.prevent="login">
      <v-text-field v-model="loginFormId"
                    :rules="loginFormIdRules"
                    label="ID (이메일 주소)"
                    clearable
                    required
                    autofocus />
      <v-text-field v-model="loginFormPassword"
                    :append-icon="loginFormPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[(value) => !!value || '비밀번호를 입력해주세요.']"
                    :type="loginFormPasswordShow ? 'text' : 'password'"
                    @click:append="loginFormPasswordShow = !loginFormPasswordShow"
                    label="비밀번호"
                    clearable
                    required />
      <v-layout column>
        <v-btn :disabled="!loginFormValidated" outlined rounded class="ma-2" type="submit" color="success">로그인</v-btn>

        <v-layout row align-center class="ma-2">
          <v-btn outlined rounded class="mr-2" color="blue" to="/register" style="flex-grow: 1">회원가입</v-btn>
          <v-btn outlined rounded small class="ml-2" color="red" @click="testLogin">테스트 로그인</v-btn>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IUserDisplay } from "@/interfaces/IDatabaseData";

@Component
export default class LoginForm extends Vue {
  /* 로그인 폼 멤버 */
  @Prop({ required: true }) loginCallback!: (val: any) => boolean;

  loginFormValidated = false;
  loginFormId = "";
  loginFormIdRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "ID (이메일 주소)를 입력해주세요.",
    (value) => (value && /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/.test(value)) || "올바른 이메일 주소를 입력해주세요.",
  ];
  loginFormPassword = "";
  loginFormPasswordShow = false;

  async login(e: any): Promise<void> {
    const success = await this.loginCallback({
      identifier: this.loginFormId,
      password: this.loginFormPassword,
    });

    if (success) {
      // nothing
    } else {
      alert("올바르지 않은 계정 정보입니다.");
      this.loginFormId = "";
      this.loginFormPassword = "";
    }
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
}
</script>
