<template>
  <v-menu :close-on-content-click="false"
          offset-y
          min-width="250px"
          transition="slide-y-transition"
          disable-keys>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <div>
          <v-list-item-title class="mt-3 text-h6">로그인</v-list-item-title>

          <v-form v-model="loginFormValidated" class="mt-4" ref="loginForm" @submit="login">
            <v-text-field v-model="loginFormId"
                          :rules="loginFormIdRules"
                          label="ID"
                          clearable
                          required />
            <v-text-field v-model="loginFormPassword"
                          :append-icon="loginFormPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[(value) => !!value || '비밀번호를 입력해주세요.']"
                          :type="loginFormPasswordShow ? 'text' : 'password'"
                          @click:append="loginFormPasswordShow = !loginFormPasswordShow"
                          label="비밀번호"
                          clearable
                          required />
            <v-btn :disabled="!loginFormValidated" class="ma-2" type="submit" color="success">로그인</v-btn>
            <v-btn class="ma-2" color="primary" to="/register">회원가입</v-btn>
          </v-form>
        </div>
      </v-list-item>

      <!-- 테스트 -->
      <v-list-item @click="testLoginCallback">
        <span>(테스트용 로그인)</span>
      </v-list-item>
      <!-- -->
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AppNonLoginAccountMenu extends Vue {
  @Prop({ required: true }) loginCallback!: (val :any) => boolean;
  @Prop({ required: true }) testLoginCallback!: () => void;

  /* 로그인 폼 멤버 */
  loginFormValidated = false;
  loginFormId = "";
  loginFormIdRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "ID를 입력해주세요.",
    (value) => (value && /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/.test(value)) || "올바른 이메일 주소를 입력해주세요.",
  ];
  loginFormPassword = "";
  loginFormPasswordShow = false;

  async login(e :any) :Promise<void> {
    e.preventDefault();
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
}
</script>
