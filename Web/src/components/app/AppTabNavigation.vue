<template>
  <v-tabs :left="tabsPosition == 'left'"
          :right="tabsPosition == 'right'"
          :centered="tabsPosition == 'center'"
          :grow="mobileMode ? true : false"
          optional
          icons-and-text>
    <v-tab to="/feed">피드 <v-icon v-if="mobileMode">mdi-card-text</v-icon></v-tab>
    <v-tab to="/discover">탐색 <v-icon v-if="mobileMode">mdi-compass</v-icon></v-tab>
    <v-tab to="/pool">풀 <v-icon v-if="mobileMode">mdi-approximately-equal-box</v-icon></v-tab>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AppTabNavigation extends Vue {
  @Prop({ default: "center" }) tabsPosition!: string;
  @Prop({ default: false }) mobileMode!: boolean;
}
</script>
