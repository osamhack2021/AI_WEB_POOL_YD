<template>
  <v-tabs :left="tabsPosition == 'left'"
          :right="tabsPosition == 'right'"
          :centered="tabsPosition == 'center'"
          :grow="tabGrow"
          optional
          icons-and-text>
    <v-tab to="/feed">피드 <v-icon>mdi-card-text</v-icon></v-tab>
    <v-tab to="/discover">탐색 <v-icon>mdi-compass</v-icon></v-tab>
    <v-tab to="/pool">풀 <v-icon>mdi-approximately-equal-box</v-icon></v-tab>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AppTabNavigation extends Vue {
  @Prop({ default: "center" }) tabsPosition!: string;
  @Prop({ default: false }) tabGrow!: boolean;
}
</script>
