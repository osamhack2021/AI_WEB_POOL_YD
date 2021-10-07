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

          <v-form v-model="loginFormValidated" class="mt-4" ref="loginForm">
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
      <v-list-item @click="loginCallback">
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
  @Prop({ required: true }) loginCallback!: () => void;

  /* 로그인 폼 멤버 */
  loginFormValidated = false;
  loginFormId = "";
  loginFormIdRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "ID를 입력해주세요.",
    (value) => (value && /^[a-zA-Z.]+$/.test(value)) || "ID는 영문자 및 마침표(.)만 사용할 수 있습니다.",
    (value) => (value && !/\.$/.test(value)) || "ID의 마지막 문자로 마침표(.)를 사용할 수 없습니다.",
    (value) => {
      const regExExec = /\.{2,}/.exec(value);

      if (value && regExExec) {
        if (regExExec.index > 0) {
          return "마침표(.) 문자는 연속으로 입력할 수 없습니다.";
        }
      }

      return true;
    },
  ];
  loginFormPassword = "";
  loginFormPasswordShow = false;
}
</script>
