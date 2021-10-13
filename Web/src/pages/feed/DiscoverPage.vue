<template>
  <div>
    <!-- discover tool -->
    <v-layout style="max-width:800px; margin: 30px auto;" column align-center>

      <!-- filter selection tabs -->
      <v-tabs
        background-color="#2F80ED"
        dark
        grow
        width="300px"
      >
        <v-tab v-for="(_filter, idx) in filters" :key="idx" @click="onClick1(_filter)">
          {{ _filter.name }}
        </v-tab>
      </v-tabs>

      <!-- subject & tags selection panel -->
      <v-expansion-panels v-for="(_subject, idx) in currentFilter.subjects" :key="idx+_subject.name">
        <v-expansion-panel style="padding: 8px 16px;">

          <!-- panel header -->
          <v-expansion-panel-header style="padding: 0;">
            <v-layout justify-center style="max-width: 100px; min-width:100px;">
              <v-chip label outlined>
                {{ _subject.name }}
              </v-chip>
            </v-layout>
            <v-chip-group class="overflow-x-auto" style="padding: 0 30px;">
              <v-chip close v-for="(_tag, idx) in
                tags.filter(tag => tag.subject === _subject.name)" :key="idx" @click:close="onClick4(_tag)">
                {{ _tag.tag }}
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-header>

          <!-- panel content -->
          <v-expansion-panel-content>
              <v-list class="overflow-y-auto" style="max-height:200px;">
                <v-list-item v-for="(_tag, idx) in _subject.tags" :key="idx"
                  @click="onClick3({ subject: _subject.name, tag: _tag})">
                  <v-chip>
                    {{ _tag }}
                  </v-chip>
                </v-list-item>
              </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- search btn -->
      <v-btn style="margin-top: 30px;" @click="search">
        검색
      </v-btn>
    </v-layout>

    <!-- search option selection -->
    <v-layout style="max-width: 1000px; margin: 0 auto;" justfify-end>
      <v-select
        :items="searchOption"
        style="max-width: 120px; margin-left: auto;"
      >
      </v-select>
    </v-layout>

    <!-- user diaplay -->
    <v-layout v-if="currentFilter.name === '사용자 계정'" justify-start wrap style="max-width: 1000px; margin: 0 auto;">

      <!-- card design -->
      <v-hover v-slot="{ hover }" v-for="(_user, idx) in userDatas" :key="idx" :v-if="false" style="width:230px; margin: 20px 10px;">
        <v-card hover>

          <!-- image section -->
          <v-img :src="apiAddress + _user.profileImageUrl" height="200px">
          </v-img>

          <!-- description -->
          <v-card-title>
            {{ _user.username }}
          </v-card-title>
          <v-card-subtitle>
            {{ _user.email }}
          </v-card-subtitle>
          <v-card-text>
            <div class="h4">
              {{ _user.department }}
            </div>
            <div class="h4">
              {{ _user.role }}
            </div>
          </v-card-text>

          <!-- hover overlay -->
          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              <v-layout column align-center>
                <div> {{ _user.postCount }} posts </div>
                <div> {{ _user.followersCount }} followers </div>
                <router-link :to="`/me/${_user.id}`" style="text-decoration:none;">
                  <v-btn>
                    프로필 이동
                  </v-btn>
                </router-link>
              </v-layout>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </v-hover>
    </v-layout>

    <!-- recruition display -->
    <v-layout v-if="currentFilter.name === '채용 공고'" justify-start wrap style="max-width: 1000px; margin: 0 auto;">

      <!-- card design -->
      <v-hover v-slot="{ hover }" v-for="(_recruition, idx) in recruitionDatas" :key="idx" style="width:230px; margin: 20px 10px;">
        <v-card hover>

          <!-- image section -->
          <v-img :src="apiAddress + _recruition.author.profileImageUrl" height="200px">
          </v-img>

          <!-- description -->
          <v-card-title>
            {{ _recruition.author.username }}
          </v-card-title>
          <v-card-subtitle style="color:black; font-size:14px;">
            {{ _recruition.title }}
          </v-card-subtitle>
          <v-card-text>
            <div class="h4">
              {{ _recruition.employmentType }}
            </div>
            <div class="h4">
              {{ _recruition.pay }}
            </div>
          </v-card-text>

          <!-- hover overlay -->
          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              <v-layout column align-center>
                {{ calculateDday(new Date(_recruition.due)) }}
              </v-layout>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </v-hover>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AxiosResponse } from "axios";
import { post as backendPost } from "@/util/BackendHelper";

interface subject {
  name: string,
  tags: Array<string>,
}

interface filter {
  name: string,
  subjects: Array<subject>
}

interface tag {
  subject: string,
  tag: string,
}

interface discoverRecruition {
  id: string,
  author: {
    id: string,
    username: string,
    profileImageUrl: string,
  }
  title: string,
  employmentType: string,
  pay: string,
  due: string,
}

interface discoverUser {
  id: string,
  username: string,
  birthday: string,
  telno: string,
  location: string,
  email: string,
  summary: string,
  department: string,
  tags: Array<string>,
  militaryBranch: string,
  role: string,
  profileImageUrl: string,
  postCount: number,
  followersCount: number,
}

@Component
export default class DiscoverPage extends Vue {
  /* define variables */
  apiAddress = "https://yd.somni.one";

  filters = [
    {
      name: "사용자 계정",
      subjects: [
        {
          name: "계급",
          tags: ["이병", "일병", "상병", "병장", "하사",
            "중사", "상사", "원사", "준위", "소위",
            "중위", "대위", "소령", "중령", "대령",
            "준장", "소장", "중장", "대장"],
        },
        {
          name: "병과",
          tags: ["보병", "기갑", "포병", "방공", "정보", "공병",
            "정보통신", "항공", "화생방", "군수-병기", "군수-병참",
            "군수-수송", "인사", "군사경찰", "재정", "공보정훈",
            "의무", "법무", "군종"],
        },
        {
          name: "관심 직군",
          tags: ["경영·사무·금융·보험직", "연구직 및 공학 기술직",
            "교육·법률·사회복지·경찰·소방직 및 군인", "보건·의료직",
            "예술·디자인·방송·스포츠직", "미용·여행·숙박·음식·경비·청소직",
            "영업·판매·운전·운송직", "건설·채굴직", "설치·정비·생산직", "농림어업직"],
        },
      ],
    },
    {
      name: "POOL",
      subjects: [
      ],
    },
    {
      name: "채용 공고",
      subjects: [
        {
          name: "계급 조건",
          tags: ["계급 무관", "하사 이상", "소위 이상", "소령 이상", "준장 이상"],
        },
        {
          name: "관련 병과",
          tags: ["보병", "기갑", "포병", "방공", "정보", "공병",
            "정보통신", "항공", "화생방", "군수-병기", "군수-병참",
            "군수-수송", "인사", "군사경찰", "재정", "공보정훈",
            "의무", "법무", "군종"],
        },
        {
          name: "직군 분류",
          tags: ["경영·사무·금융·보험직", "연구직 및 공학 기술직",
            "교육·법률·사회복지·경찰·소방직 및 군인", "보건·의료직",
            "예술·디자인·방송·스포츠직", "미용·여행·숙박·음식·경비·청소직",
            "영업·판매·운전·운송직", "건설·채굴직", "설치·정비·생산직", "농림어업직"],
        },
      ],
    },
  ];

  currentFilter = this.filters[0];

  tags :tag[] = [];

  searchOptions = {
    user: [
      {
        text: "가입일",
        value: "가입일",
      },
      {
        text: "연관성",
        value: "연관성",
      },
      {
        text: "팔로우 수",
        value: "팔로우 수",
      },
      {
        text: "포스트 수",
        value: "포스트 수",
      },
    ],
    pool: [],
    recruition: [
      {
        text: "작성일",
        value: "작성일",
      },
      {
        text: "연관성",
        value: "연관성",
      },
      {
        text: "마감일",
        value: "마감일",
      },
    ],
  }

  searchOption = this.searchOptions.user;

  userDatas :discoverUser[] = [];

  recruitionDatas :discoverRecruition[] = [];

  /* define methods */
  onClick1(val: filter): void {
    this.currentFilter = val;
    if (val.name === "사용자 계정") this.searchOption = this.searchOptions.user;
    else if (val.name === "POOL") this.searchOption = this.searchOptions.pool;
    else this.searchOption = this.searchOptions.recruition;
  }

  onClick3(val: tag): void {
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    if (idx > -1) console.log(idx); /* this.tags.splice(idx, 1); */
    else this.tags.push(val);
  }

  onClick4(val: tag): void {
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    this.tags.splice(idx, 1);
  }

  calculateDday(val: Date): string {
    const dday = Math.floor((val.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (dday < 0) return "마감";
    if (dday === 0) return "D - day";
    return `D - ${dday}`;
  }

  async search(): Promise<void> {
    const currentSubjects = this.currentFilter.subjects.map((_subject) => _subject.name);
    const tags = this.tags.filter((_tag) => currentSubjects.indexOf(_tag.subject) > -1);
    let target = null;
    switch (this.currentFilter.name) {
      case "사용자 계정":
        target = "user";
        break;
      case "POOL":
        target = "pool";
        break;
      case "채용 공고":
        target = "recruition";
        break;
      default:
        target = null;
    }
    const post = {
      target,
      tags,
      number: 30,
    };

    const response = await backendPost("/posts/discover", post) as AxiosResponse<{data: Array<unknown>}>;

    if (response.status >= 400) {
      // ERROR HANDLING
    } else if (post.target === "user") {
      this.userDatas = response.data.data as Array<discoverUser>;
    } else if (post.target === "pool") {
      // TODO
    } else if (post.target === "recruition") {
      this.recruitionDatas = response.data.data as Array<discoverRecruition>;
    }
  }
}
</script>

<style lg="scss" scoped>
  .h2{
    font-size: 20px;
  }
  .h3{
    font-size: 16px;
  }
  .h4{
    font-size: 12px;
  }
</style>
