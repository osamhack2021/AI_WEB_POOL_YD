<template>
  <v-container fluid>
    <v-img src="@/assets/images/landing.jpg"
           height="100vh"
           width="55vw"
           position="bottom"
           class="pa-2 align-end d-none d-md-flex">
      <span class="white--text text-subtitle-2" style="opacity: 0.75">Photo by <a href="https://unsplash.com/photos/XnN42lsNv28">Simone Mascellari</a>, used under <a href="https://unsplash.com/license">Unsplash License</a>.</span>
    </v-img>

    <v-card class="landing-content-area pa-16">
      <v-slide-x-reverse-transition>
        <v-layout v-if="transitionStep1" column align-start justify-center fill-height>
          <div class="text-h1 mb-6 blue--text" style="font-weight: 900">{{ $store.state.appName }}</div>
          <p class="text-h4 my-6" style="font-weight: 700">국군 장병의 자기 계발과 취업 정보 습득을 한 곳에.<br>POOL에 흠뻑 빠져보세요.</p>

          <v-slide-x-reverse-transition leave-absolute>
            <router-view />
          </v-slide-x-reverse-transition>
        </v-layout>
      </v-slide-x-reverse-transition>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import delay from "delay";

@Component
export default class LandingPage extends Vue {
  transitionStep1 = false;

  async created(): Promise<void> {
    await delay(300);
    this.transitionStep1 = true;
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
  width: 100vw;
  height: 100vh;
}

@media (min-width: 960px) {
  .landing-content-area {
    width: 50vw;
    border-radius: 5vw 0 0 5vw !important;
  }
}
</style>
