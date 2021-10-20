<template>
<div class="resume-writer pt-6">
  <v-container class="wrapper">
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-text>
            <v-slider label="강도" min="0" max="100" v-model="generateStrength"></v-slider>
            <v-slider label="유창함" min="0" max="100" v-model="generateNatural"></v-slider>
            <v-slider label="샘플 수" min="1" max="5" v-model="generateNSamples" :tick-labels="[1,2,3,4,5]"
                                                                  ticks="always"
                                                                  tick-size="4"></v-slider>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="generateResume">문장 생성하기</v-btn>
          </v-card-actions>
        </v-card>
        <v-layout v-if="resumeLoadedFirstTime && !resumeLoaded" justify-center align-center class="mt-8">
          <v-progress-circular indeterminate />
          <span class="ml-2">자소서 문장을 생성하는 중입니다... <br> 시연 모드이므로 대기시간이 있습니다. <br> (문장 당 10~20초)</span>
        </v-layout>
        <v-list v-if="resumeLoaded">
          <v-lazy :options="{ threshold: 0.5 }"
                  transition="slide-y-reverse-transition"
                  class="mt-2"
                  v-for="(item, index) in resumeItems"
                  :key="index"
                  >
            <v-card hover ripple @click="resumeContent += (' ' + item)">
              <v-card-text>{{item}}</v-card-text>
            </v-card>
          </v-lazy>
        </v-list>
      </v-col>
      <v-col cols="6">
        <v-card class="textfield d-flex justify-center pa-10">
          <textarea type="text" placeholder="이곳을 클릭해 자소서 작성 시작" v-model="resumeContent" class="textfield__input"></textarea>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-text-field
          solo
          label="맞춤법 교정"
          v-model="grammarQuery"
          prepend-inner-icon="mdi-magnify"
          @keypress.enter="fixGrammar"
        ></v-text-field>
        <v-layout v-if="grammarLoadedFirstTime && !grammarLoaded" justify-center align-center class="mt-8">
          <v-progress-circular indeterminate />
          <span class="ml-2">맞춤법을 교정하는 중입니다...</span>
        </v-layout>
        <v-list v-if="grammarLoaded">
          <v-lazy :options="{ threshold: 0.5 }"
                  transition="slide-y-reverse-transition"
                  class="mt-2"
                  >
            <v-card hover ripple @click="resumeContent += (' ' + grammarResult)">
              <v-card-text>{{grammarResult}}</v-card-text>
            </v-card>
          </v-lazy>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios, { AxiosResponse } from "axios";

@Component({
  components: { },
})
export default class ResumeWriterPage extends Vue {
  resumeLoadedFirstTime = false;
  resumeLoaded = false;

  generateStrength = 50;
  generateNatural = 50;
  generateNSamples = 3;

  resumeItems: Array<string> = [];
  resumeContent = "";

  grammarLoadedFirstTime = false;
  grammarLoaded = false;
  grammarQuery = "";
  grammarResult = "";

  async fixGrammar(): Promise<void> {
    this.grammarLoadedFirstTime = true;
    this.grammarLoaded = false;

    const post = {
      data: this.grammarQuery,
    };

    const request = {
      type: "detour",
      url: `${process.env.VUE_APP_GIO_API_URL}/checkSpell`,
      data: post,
    };

    const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/posts/discover`, request, {
      responseType: "json",
    }) as AxiosResponse<any>;

    const { data } = response;

    if (response.status >= 400) {
      console.log("error in spell check");
      console.log(data);
      this.grammarLoadedFirstTime = false;
    } else {
      this.grammarResult = data.text_spell_checked;
      this.grammarLoaded = true;
    }
  }

  async generateResume(): Promise<void> {
    this.resumeLoadedFirstTime = true;
    this.resumeLoaded = false;

    const post = {
      request: "generateResume",
      generateResumeData: {
        currentText: this.resumeContent,
        tags: ["해커톤", "개발", "머신러닝", "딥러닝", "모델", "학습"],
        strength: this.generateStrength / 100,
        natural: this.generateNatural / 100,
        nSamples: this.generateNSamples - 1,
      },
    };

    const request = {
      type: "detour",
      url: `${process.env.VUE_APP_AKS_URL}`,
      data: post,
      key: `${process.env.VUE_APP_AKS_KEY}`,
    };

    const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/posts/discover`, request, {
      responseType: "json",
    }) as AxiosResponse<any>;

    const { data } = response;

    if (response.status >= 400) {
      console.log("error in generating resume");
      console.log(data);
      this.resumeLoadedFirstTime = false;
    } else {
      this.resumeItems = data.generatedTexts;
      this.resumeLoaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list {
  background: none;
}

.resume-writer {
  background: $color-sand-lighter;
}

.wrapper {
  max-width: 1400px;
}

.textfield {
  height: 90vh;
  background: #fff;
}

.textfield__input {
  width: 90%;
  height: 90%;
  border: none;
  outline: none;
}

</style>
