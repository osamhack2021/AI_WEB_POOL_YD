 <template>
  <v-card outlined class="credits">
    <v-card-title class="pb-0">가감점</v-card-title>
    <v-card-text justify="center" class="credits__summary d-flex">
      <v-col class="credits__plus blue--text text-center">
        <div class="credits__plus-text text-caption">가점</div>
        <div class="credits__plus-value text-h4">73</div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="credits__minus red--text text-center">
        <div class="credits__minus-text text-caption">감점</div>
        <div class="credits__minus-value text-h4">4</div>
      </v-col>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="py-0 pl-0">
      <v-timeline dense>
        <v-timeline-item small>
          <v-card class="credit--submit">
            <v-card-subtitle
              class="
                pb-0
                text-caption
                d-flex
                justify-space-between
                align-center
              "
            >
              <div>
                <span class="mr-3 text-no-wrap">2021.10.02</span>
                <span class="text-no-wrap">@ 항공작전전대</span>
              </div>
              <v-btn icon small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-card-subtitle>
            <v-card-title class="d-flex justify-space-between align-start flex-nowrap pt-0">
              <div class="font-weight-bold">풋살대회</div>
              <div class="text-right">우승</div>
            </v-card-title>
          </v-card>
          <v-card class="credit">
            <v-card-subtitle
              class="
                pb-0
                text-caption
                d-flex
                justify-space-between
                align-center
              "
            >
              <div>
                <span class="mr-3 text-no-wrap">2021.10.02</span>
                <span class="text-no-wrap">@ 항공작전전대</span>
              </div>
              <v-btn icon small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-card-subtitle>
            <v-card-title class="d-flex justify-space-between align-start flex-nowrap pt-0">
              <div class="font-weight-bold">풋살대회</div>
              <div class="text-right">우승</div>
            </v-card-title>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class MyPageCredits extends Vue {}
</script>
