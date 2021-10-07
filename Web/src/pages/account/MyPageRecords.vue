<template>
  <v-card outlined class="records">
    <v-card-title class="pb-0">{{ kind }}</v-card-title>
    <v-card-text
      justify="center"
      class="records__summary d-flex justify-center"
    >
      <template v-for="(summary, summary_index) in summaryNumbers">
        <v-col
          :key="`asset-${summary_index}`"
          :class="`${summary.color}--text text-center`"
        >
          <div class="text-caption">{{ summary.label }}</div>
          <div class="text-h4">{{ summary.value }}</div>
        </v-col>
        <v-divider
          vertical
          :key="`divider-${summary_index}`"
          v-if="summary_index < summaryNumbers.length - 1"
        ></v-divider>
      </template>
    </v-card-text>
    <v-divider></v-divider>
    <div class="pr-6">
      <v-timeline dense>
        <v-timeline-item small>
          <v-card class="records__input pa-3">
            <v-row>
              <v-col cols="5">
                <v-menu
                  ref="inputMenu"
                  v-model="inputDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="inputDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="inputDate"
                      :label="inputLabels.date"
                      hide-details="auto"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inputDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="inputDateMenu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.inputMenu.save(inputDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  :label="inputLabels.location"
                  v-model="inputLocation"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-text-field
                  :label="inputLabels.title"
                  v-model="inputTitle"
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-text-field
                  :label="inputLabels.value"
                  v-model="inputValue"
                  :rules="isLastInputNumber ? [numberRule] : []"
                  hide-details="auto"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row class="justify-end">
              <v-col cols="auto"
                ><v-btn
                  small
                  elevation="0"
                  @click="initializeInputs()"
                  class="records__cancel-btn"
                  >Cancel</v-btn
                ></v-col
              >
              <v-col cols="auto">
                <v-btn
                  small
                  elevation="0"
                  @click="handleCreate()"
                  class="records__submit-btn"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          small
          v-for="(
            { date, location, title, value }, index
          ) in cardContentsList"
          :key="index"
        >
          <v-card class="record">
            <v-container>
              <v-row class="text-caption">
                <v-col class="d-flex flex-wrap align-center">
                  <span cols="auto" class="mr-3">{{ date }}</span>
                  <span cols="auto">{{ location }}</span>
                </v-col>
                <v-col cols="auto">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        class="align-self-start"
                        ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                      >
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(config, config_index) in recordConfigs"
                        :key="config_index"
                        @click="config.handler(index)"
                      >
                        <v-list-item-title>{{
                          config.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row class="align-start mt-0 text-subtitle-1">
                <v-col class="font-weight-bold">{{ title }}</v-col>
                <v-col cols="auto">{{ value }}</v-col>
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
import { Prop } from "vue-property-decorator";
import type {
  IRecordsDisplay,
  IRecordsLabels,
  IRecordsSummary,
} from "./IRecordsData";

@Component
export default class MyPageRecords extends Vue {
  @Prop() readonly inputLabels: IRecordsLabels;
  @Prop() readonly summaryNumbers: Array<IRecordsSummary>;
  @Prop() readonly cardContentsList: Array<IRecordsDisplay>;
  @Prop() readonly isLastInputNumber: boolean;
  @Prop() readonly kind: string;

  inputDateMenu = false;
  inputDate = "";
  inputLocation = "";
  inputTitle = "";
  inputValue = "";
  initializeInputs(date = "", location = "", title = "", value = ""): void {
    this.inputDateMenu = false;
    this.inputDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    this.inputLocation = location;
    this.inputTitle = title;
    this.inputValue = value;
  }

  numberRule = (text: string): boolean | string =>
    /^[1-9]\d*$/.test(text) || "숫자만 입력 가능합니다!";

  recordConfigs = [
    {
      title: "삭제하기",
      handler: (index: number): void => {
        this.handleDelete(index);
      },
    },
  ];

  handleCreate(): void {
    const value: number | string = this.isLastInputNumber
      ? Number(this.inputValue)
      : this.inputValue;

    this.$emit("create", {
      kind: this.kind,
      date: this.inputDate,
      location: this.inputLocation,
      title: this.inputTitle,
      value,
    });

    this.initializeInputs();
  }

  handleDelete(index: number): void {
    this.$emit("delete", this.cardContentsList[index].id);
  }

  mounted(): void {
    this.initializeInputs();
  }
}
</script>
