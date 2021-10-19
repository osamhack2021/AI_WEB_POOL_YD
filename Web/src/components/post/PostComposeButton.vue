<template>
  <v-btn title="글 작성"
         elevation="4"
         @click.prevent="clickCallback"
         :loading="loading && !complete"
         :disabled="loading"
         :icon="!descriptive"
         :fab="!descriptive"
         :large="descriptive"
         :dark="dark"
         rounded
         :class="{ 'compose-button': true, 'primary': !complete, 'success': complete }">
    <v-icon v-if="!complete">mdi-send</v-icon>
    <v-icon v-else>mdi-check</v-icon>

    <span v-if="descriptive && !complete" class="ml-2">글 작성</span>
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
  @Prop({ default: false }) complete!: boolean;
  @Prop({ default: false }) dark!: boolean;
  @Prop() clickCallback!: () => Promise<void>;
}
</script>
