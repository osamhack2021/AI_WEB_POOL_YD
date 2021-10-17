<template>
  <div>
    <!-- 나의 풀 -->
    <v-layout style="max-width: 1000px; margin: 30px auto;" column align-start>
      <label>나의 풀</label>
      <v-slide-group>
        <v-slide-item v-for="(pool, idx) in myPools" :key="idx">

          <!-- card design -->
          <v-hover v-slot="{ hover }" style="max-width: 200px; max-height: 240px; margin: 10px;">
            <v-card class="rounded-xl">

              <!-- image -->
              <v-img :src="pool.imageUrl" style="max-height: 120px;">
              </v-img>

              <!-- description -->
              <v-card-text>
                <div>{{ pool.name }}</div>
                <v-chip-group>
                  <v-chip small v-for="(tag, idx) in pool.tags" :key="idx">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>

              <!-- hover overlay -->
              <v-fade-transition>
                <v-overlay v-if="hover" absolute>
                  <v-layout column align-center>
                    <div class="mb-2">{{ pool.members.length }} divers</div>
                    <router-link :to="`/pool/${pool.name}`" style="text-decoration: none;">
                      <v-btn>풀 이동</v-btn>
                    </router-link>
                  </v-layout>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>

      <!-- 전체보기 버튼 -->
      <v-btn text style="margin-left: auto; color: #1976d2;">
        풀 전체보기 >
      </v-btn>
    </v-layout>

    <!-- 지금 뜨는 풀 -->
    <v-layout style="max-width: 1000px; margin: 30px auto;" column align-start>
      <label>지금 뜨는 풀</label>
      <v-slide-group>
        <v-slide-item v-for="(pool, idx) in myPools" :key="idx">

          <!-- card design -->
          <v-hover v-slot="{ hover }" style="max-width: 200px; max-height: 240px; margin: 10px;">
            <v-card class="rounded-xl">

              <!-- image -->
              <v-img :src="pool.imageUrl" style="max-height: 120px;">
              </v-img>

              <!-- description -->
              <v-card-text>
                <div>{{ pool.name }}</div>
                <v-chip-group>
                  <v-chip small v-for="(tag, idx) in pool.tags" :key="idx">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>

              <!-- hover overlay -->
              <v-fade-transition>
                <v-overlay v-if="hover" absolute>
                  <v-layout column align-center>
                    <div class="mb-2">{{ pool.members.length }} divers</div>
                    <router-link :to="`/pool/${pool.name}`" style="text-decoration: none;">
                      <v-btn>풀 이동</v-btn>
                    </router-link>
                  </v-layout>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-layout>

    <!-- 최신 피드 -->
    <v-layout style="max-width: 1000px; margin: 30px auto;" column>
      <label>최신 피드</label>
      <v-layout style="max-width: 800px; margin: 0 auto" column>
        피드들
      </v-layout>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PoolFeedPage extends Vue {
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

  myPools :any[] = [];

  address = "https://yd.somni.one";

  async created() :Promise<void> {
    fetch(`${this.address}/pools`)
      .then((res) => res.json())
      .then((data) => {
        this.myPools = data.map((el :any) => {
          let { createdAt } = el;
          createdAt = new Date(createdAt);
          createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`;
          return {
            ...el,
            createdAt,
            imageUrl: `${this.address}${data[0].image.url}`,
            tags: el.tags.map((tag :any) => tag.content),
          };
        });
      });
  }
}
</script>

<style lg="scss" scoped>
  .v-card__text{
    padding : 8px 16px;
  }
  label{
    font-size: 24px;
    font-weight : bold;
    display: inline-block;
    margin-left: 30px;
  }
</style>
