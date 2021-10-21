<template>
  <v-layout column>
    <v-list-item-title class="mt-3 text-h4" style="align-self: flex-start">회원가입</v-list-item-title>

    <v-form v-model="registerFormValidated" class="mt-4" @submit.prevent="login">
      <v-text-field v-model="registerFormId"
                    :rules="registerFormIdRules"
                    @input="onInput"
                    label="ID (이메일 주소)"
                    tabindex="1"
                    clearable
                    required
                    autofocus />
      <v-text-field v-model="registerFormPassword"
                    :append-icon="registerFormPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="registerFormPasswordRules"
                    :type="registerFormPasswordShow ? 'text' : 'password'"
                    @click:append="registerFormPasswordShow = !registerFormPasswordShow"
                    @input="onInput"
                    label="비밀번호"
                    tabindex="2"
                    ref="login-password"
                    clearable
                    required />
      <v-text-field v-model="registerFormPasswordConfirm"
                    :rules="[(value) => (value === registerFormPassword) || '비밀번호가 일치하지 않습니다.']"
                    :type="registerFormPasswordShow ? 'text' : 'password'"
                    @input="onInput"
                    label="비밀번호 확인"
                    tabindex="3"
                    clearable
                    required />

      <v-slide-x-reverse-transition>
        <v-alert v-if="errorMessage" type="error" class="my-4" dense>{{ errorMessage }}</v-alert>
      </v-slide-x-reverse-transition>

      <v-layout column>
        <v-layout row align-center class="ma-2">
          <v-btn :disabled="!registerFormValidated || isRegistering"
                :loading="isRegistering"
                type="submit"
                color="success"
                class="ma-2"
                style="flex-grow: 1"
                outlined
                rounded>회원가입</v-btn>
          <v-btn text class="mr-2" color="red" to="/">취소</v-btn>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class LoginForm extends Vue {
  registerFormValidated = false;
  registerFormId = "";
  registerFormIdRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "ID (이메일 주소)를 입력해주세요.",
    (value) => (value && /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/.test(value)) || "올바른 이메일 주소를 입력해주세요.",
  ];
  registerFormPassword = "";
  registerFormPasswordRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "비밀번호를 입력해주세요.",
    (value) => (value && value.length >= 8) || "비밀번호는 8자리 이상 입력해 주세요.",
  ];
  registerFormPasswordShow = false;
  registerFormPasswordConfirm = "";
  isRegistering = false;
  errorMessage = "";

  async register(e: any): Promise<void> {
    // REGISTER LOGIC HERE
  }

  onInput(): void {
    this.errorMessage = "";
  }
}
</script>
