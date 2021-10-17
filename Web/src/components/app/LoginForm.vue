<template>
  <v-layout column>
    <v-list-item-title class="mt-3 text-h4" style="align-self: flex-start">로그인</v-list-item-title>

    <v-form v-model="loginFormValidated" class="mt-4" @submit.prevent="login">
      <v-text-field v-model="loginFormId"
                    :rules="loginFormIdRules"
                    @input="onInput"
                    label="ID (이메일 주소)"
                    tabindex="1"
                    clearable
                    required
                    autofocus />
      <v-text-field v-model="loginFormPassword"
                    :append-icon="loginFormPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[(value) => !!value || '비밀번호를 입력해주세요.']"
                    :type="loginFormPasswordShow ? 'text' : 'password'"
                    @click:append="loginFormPasswordShow = !loginFormPasswordShow"
                    @input="onInput"
                    label="비밀번호"
                    tabindex="2"
                    ref="login-password"
                    clearable
                    required />

      <v-slide-x-reverse-transition>
        <v-alert v-if="errorMessage" type="error" class="my-4" dense>{{ errorMessage }}</v-alert>
      </v-slide-x-reverse-transition>

      <v-layout column>
        <v-btn :disabled="!loginFormValidated || isLoggingIn"
               :loading="isLoggingIn"
               type="submit"
               color="success"
               class="ma-2"
               outlined
               rounded>로그인</v-btn>

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
  isLoggingIn = false;
  errorMessage = "";

  async login(e: any): Promise<void> {
    this.isLoggingIn = true;

    const success = await this.loginCallback({
      identifier: this.loginFormId,
      password: this.loginFormPassword,
    });

    if (success) {
      // Nothing to do
    } else {
      this.errorMessage = "일치하는 계정 정보를 찾을 수 없습니다.";

      this.loginFormPassword = "";
      (this.$refs["login-password"] as HTMLElement).focus();
    }

    this.isLoggingIn = false;
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

  onInput(): void {
    this.errorMessage = "";
  }
}
</script>
