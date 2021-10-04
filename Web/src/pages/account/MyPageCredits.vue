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
    <div class="pr-6">
      <v-timeline dense>
        <v-timeline-item small>
          <v-card class="credit__submit pa-3">
            <v-row>
              <v-col cols="5">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="일자"
                      hide-details="auto"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  label="위치"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-text-field
                  label="활동"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-text-field
                  label="점수"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
        <v-timeline-item small>
          <v-card class="credit">
            <v-container>
              <v-row class="text-caption">
                <v-col class="d-flex flex-wrap flex-wrap align-center">
                  <span cols="auto" class="mr-3">2021.10.02</span>
                  <span cols="auto">@ 항공작전전대</span>
                </v-col>
                <v-col cols="auto">
                  <v-btn icon small class="align-self-start"
                    ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                  >
                </v-col>
              </v-row>
              <v-row class="align-start mt-0 text-subtitle-1">
                <v-col class="font-weight-bold">
                  추석행사
                </v-col>
                <v-col cols="auto">3점</v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class MyPageCredits extends Vue {
  menu = false;
  date: string = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  rules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "Required.",
    (value) => (value && value.length >= 3) || "Min 3 characters",
  ];
}
</script>

<style lang="scss" scoped>
.v-text-field {
  font-size: 0.8rem;
}
</style>
