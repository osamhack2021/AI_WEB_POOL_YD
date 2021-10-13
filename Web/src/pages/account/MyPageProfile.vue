<template>
  <div class="profile d-flex flex-column justify-space-between">
    <v-img
      class="profile__pic rounded-xl"
      aspect-ratio="1"
      width="100%"
      :src="`https://yd.somni.one${profileData.thumbnail.url}`"
    ></v-img>
    <div class="profile__title">
      <div class="profile__name">{{ profileData.username }}</div>
      <div class="profile__id">{{ profileData.email }}</div>
    </div>
    <div class="profile__status">{{ profileData.summary }}</div>
    <div class="d-flex align-center">
      <v-btn plain small class="px-0">
        <v-icon small class="pr-1">mdi-account-multiple-outline</v-icon>
        {{ profileData.followers.length }} follower
      </v-btn>
      <div class="profile__divider px-1">·</div>
      <v-btn plain small class="px-0">{{ profileData.followings.length }} following</v-btn>
    </div>
    <v-btn block small elevation="0" color="primary">follow</v-btn>
    <v-divider class="my-2"></v-divider>
    <div class="profile__detail">
      <div>{{ profileData.soldierData.department }}</div>
      <div>{{ profileData.soldierData.role }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class MyPageProfile extends Vue {
  @Prop() readonly profileData: any;
}
</script>

<style lang="scss" scoped>
.profile {
  > * {
    flex-grow: 0;
  }
  div {
    font-weight: 300;
  }
  &__pic {
    z-index:3;
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
