<template>
  <v-btn class="primary compose-button"
         elevation="4"
         title="글 작성"
         @click.prevent="clickCallback"
         :loading="loading"
         :disabled="loading"
         :icon="!descriptive"
         :fab="!descriptive"
         :large="descriptive"
         rounded>
    <v-icon>mdi-send</v-icon>
    <span v-if="descriptive" class="ml-2">글 작성</span>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class PostComposeButton extends Vue {
  @Prop({ default: false }) descriptive!: boolean;
  @Prop({ default: false }) loading!: boolean;
  @Prop() clickCallback!: () => Promise<void>;
}
</script>
