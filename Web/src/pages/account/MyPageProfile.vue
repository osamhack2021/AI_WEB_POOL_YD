<template>
  <div
    class="profile d-flex flex-column justify-space-between"
    style="width: 70%; height: 33rem"
  >
    <v-img
      class="profile__pic rounded-xl"
      aspect-ratio="1"
      width="100%"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <div class="profile__title">
      <div class="profile__name">지우석</div>
      <div class="profile__id">@woosukji</div>
    </div>
    <div class="profile__status">Stay hungry. Yes I'm hungry.</div>
    <div class="d-flex align-center">
      <v-btn plain small class="px-0">
        <v-icon small class="pr-1">mdi-account-multiple-outline</v-icon>
        5 liked
      </v-btn>
      <div class="profile__divider px-1">·</div>
      <v-btn plain small class="px-0">3 liking</v-btn>
    </div>
    <v-btn block small elevation="0" color="primary">like</v-btn>
    <v-divider class="my-2"></v-divider>
    <div class="profile__detail">
      <div>10비</div>
      <div>작전정보체계운영병</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class MyPageProfile extends Vue {}
</script>

<style lang="scss">
.profile {
  > * {
    flex-grow: 0;
  }
  div {
    font-weight: 300;
  }
  &__name {
    font: {
      size: 2rem;
      weight: 500 !important;
    }
  }
  &__id {
    margin-top: -0.4rem;
    font-size: 0.9rem;
  }
}
</style>
