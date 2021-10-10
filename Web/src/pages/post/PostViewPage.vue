<template>
  <v-responsive v-if="postLoaded" class="pb-8">
    <v-img :src="postData.previewMainImageUrl"
           dark
           width="100%"
           height="300px">
      <div class="post-image-darken-overlay"></div>

      <v-layout align-center justify-center fill-height class="mx-auto" style="max-width: 800px">
        <div class="text-h3 text-center">{{ postData.title }}</div>
      </v-layout>
    </v-img>

    <v-card width="95%" max-width="800px" elevation="8" class="mx-auto mt-n8 pa-2 pa-sm-8">
      <v-card-text v-html="postData.contentFull" class="text-body-1" style="color: rgba(0, 0, 0, 0.8)" />

      <v-layout class="mt-8 pa-2">
        <v-spacer />

        <v-layout style="flex-grow: 0">
          <v-layout justify-end align-center>
            <div>written by <strong>{{ postData.author.username }}</strong></div>
          </v-layout>

          <img :src="postData.author.profileImageUrl"
              class="ml-3 elevation-2"
              style="width: 64px; border-radius: 100%" />
        </v-layout>
      </v-layout>
    </v-card>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IPost } from "@/interfaces/IDatabaseData";
import { get as backendGet } from "@/util/BackendHelper";

@Component
export default class PostViewPage extends Vue {
  postData: IPost | null = null;
  postLoaded = false;

  async created(): Promise<void> {
    const response = await backendGet(`/posts/${this.$route.params.id}`);

    if (response.status >= 400) {
      // REQUEST ERROR HANDLING
    } else {
      this.postData = response.data as IPost;

      this.postLoaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-image-darken-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
