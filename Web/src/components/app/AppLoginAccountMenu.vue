<template>
  <v-menu offset-y
        min-width="250px"
        transition="slide-y-transition">
  <template v-slot:activator="{ on, attrs }">
    <v-btn icon v-on="on" v-bind="attrs">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </template>

  <v-list>
    <v-list-item class="py-2" :to="`/me/${$store.state.loginState.userInfo.id}`">
      <v-layout align-center>
        <img :src="absolutePath($store.state.loginState.userInfo.profileImageUrl)"
             style="width: 64px; height: 64px; border-radius: 100%;" />

        <v-layout class="ml-3" column>
          <span class="text-h6">{{ $store.state.loginState.userInfo.username }}</span>
          <span>{{ $store.state.loginState.userInfo.id }}</span>
        </v-layout>
      </v-layout>
    </v-list-item>

    <v-divider class="my-2" />

    <v-list-item @click="logoutCallback">
      <v-icon class="mr-2">mdi-logout</v-icon>
      <span>로그아웃</span>
    </v-list-item>
  </v-list>
  </v-menu>
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { absolutePath as backendAbsolutePath } from "@/util/BackendHelper";

@Component
export default class AppNonLoginAccountMenu extends Vue {
  @Prop({ required: true }) logoutCallback!: () => void;

  absolutePath = backendAbsolutePath;
}
</script>
