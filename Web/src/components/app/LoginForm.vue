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

        <v-btn outlined rounded class="ma-2" color="blue" to="/register" style="flex-grow: 1">회원가입</v-btn>

        <v-layout column>
          <v-btn @click="demoLoginCallback" outlined rounded class="ma-2 mt-6">오프라인 데모 접속</v-btn>
          <span class="ml-2 blue-grey--text text-subtitle-2">백엔드 서버를 사용할 수 없을 때,<br>일부 기능의 사용이 불가한 채로<br>POOL의 전반적인 모습을 확인할 수 있습니다.</span>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  /* 로그인 폼 멤버 */
  @Prop({ required: true }) loginCallback!: (val: any) => Promise<boolean>;
  @Prop() demoLoginCallback: () => void = () => { /* empty */ };

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

  async login(): Promise<void> {
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

  onInput(): void {
    this.errorMessage = "";
  }
}
</script>
