<template>
  <v-container fluid>
    <!-- top image -->
    <v-img :src="samplePool.imageUrl"
            width="100%"
            height="500px"
            >
    </v-img>

    <!-- pool info box -->
    <v-card class="rounded-xl" elevation=8 style="max-width: 800px; margin: -240px auto 0 auto;">
      <v-toolbar flat class="h2" style="padding: 8px;" :color="averageColor" min-height=80 dark>{{ samplePool.name }}</v-toolbar>
      <v-card-text class="pa-8 pt-4">
        <!-- <div class="h2 pb-4" style="color:black;">{{ samplePool.name }}</div> -->
        <v-divider></v-divider>
        <v-tabs :color="averageColor">
          <v-tab style="font-size: 16px; padding: 0;" @click="onClick1('정보')">정보</v-tab>
          <v-tab style="font-size: 16px; padding: 0;" @click="onClick1('통계')">통계</v-tab>
          <v-tab style="font-size: 16px; padding: 0;" @click="onClick1('멤버')">멤버</v-tab>
        </v-tabs>

        <!-- 정보 -->
        <v-layout column v-if="infoState === '정보'">
          <div class="h4 py-6">{{ samplePool.summary }}</div>
          <div class="h4 pb-4"> - {{ samplePool.members.length }}명이 풀에서 헤엄치는 중</div>
          <div class="h4 pb-4"> - 관리자: {{ samplePool.admin.username }}</div>
          <div class="h4 pb-4"> - {{ samplePool.createdAt }}에 만듦</div>
        </v-layout>

        <!-- 통계 -->
        <v-layout column v-if="infoState === '통계'">
          통계
        </v-layout>

        <!-- 멤버 -->
        <v-layout column v-if="infoState === '멤버'">
          멤버
        </v-layout>

        <v-divider></v-divider>

        <!-- tags -->
        <label style="display:inline-block" class="pt-4 pb-2">태그</label>
        <v-chip-group>
          <v-chip text-color="white" :color="averageColor" v-for="(tag, idx) in samplePool.tags" :key="idx">
            {{ tag }}
          </v-chip>
        </v-chip-group>

        <!-- btn -->
        <v-layout align-center>
          <v-btn elevation=6 dark class="mt-2 px-8 py-2 rounded-xl" :color="averageColor" style="margin: 0 auto;">DIVE IN</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>

    <!-- feed compose -->
    <v-responsive class="mx-auto" style="margin-top: 60px; padding-bottom: 100px;" max-width="800px">
      <feed-compose class="my-3"/>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FeedItemComponent from "@/components/feed/FeedItem.vue";
import FeedComposeComponent from "@/components/feed/FeedCompose.vue";

@Component({
  components: {
    FeedItem: FeedItemComponent,
    FeedCompose: FeedComposeComponent,
  },
})
export default class PoolPage extends Vue {
  address = "https://yd.somni.one";

  samplePool :any = {
    name: "",
    summary: "",
    members: [],
    admin: "",
    tags: [],
    imageUrl: "",
    posts: [],
    createdAt: "",
  };

  averageColor = "white";

  infoState = "정보";

  getAverageRGB(imgEl :any) :any {
    const blockSize = 2;
    const defaultRGB = {
      r: 0,
      g: 0,
      b: 0,
    };
    const canvas = document.createElement("canvas");
    const context = canvas.getContext && canvas.getContext("2d");
    let data;
    let i = 0;
    const rgb = {
      r: 0,
      g: 0,
      b: 0,
    };
    let count = 0;

    if (!context) {
      console.log("context error");
      return defaultRGB;
    }

    canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    const { height } = canvas;
    console.log(height);

    canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    const { width } = canvas;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
      console.log(data);
    } catch (e) {
      console.log(e);
      return defaultRGB;
    }

    const { length } = data.data;

    while (data.data[i]) {
      count += 1;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
      i += blockSize * 4;
    }

    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
  }

  addImageProcess(src :string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      img.crossOrigin = "Anonymous";
    });
  }

  async setAverageColor(src :string) :Promise<void> {
    const img = await this.addImageProcess(src);
    const averageRGB = this.getAverageRGB(img);
    this.averageColor = `rgba(${averageRGB.r}, ${averageRGB.g}, ${averageRGB.b}, 1)`;
  }

  async created(): Promise<void> {
    fetch(`${this.address}/pools`)
      .then((res) => res.json())
      .then((data) => {
        let { createdAt } = data[0];
        createdAt = new Date(createdAt);
        createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`;
        this.samplePool = {
          ...data[0],
          createdAt,
          imageUrl: `${this.address}${data[0].image.url}`,
          tags: data[0].tags.map((el :any) => el.content),
        };
        this.setAverageColor(this.samplePool.imageUrl);
      });
  }

  onClick1(val :string) {
    this.infoState = val;
  }
}
</script>

<style lg="scss" scoped>
  .h1{
    font-size: 30px;
  }
  .h2{
    font-size: 24px;
  }
  .h3{
    font-size: 18px;
  }
  .h4{
    font-size: 16px;
  }
  label{
    font-size: 18px;
    font-weight: bold;
  }
</style>
