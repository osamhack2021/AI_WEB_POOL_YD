<template>
  <div>
    <!-- discover tool -->
    <v-layout style="max-width:800px; margin: 30px auto;" column align-center>

      <!-- filter selection tabs -->
      <v-tabs
        background-color="indigo"
        dark
        grow
        width="300px"
      >
        <v-tab v-for="(_filter, idx) in filters" :key="idx" @click="onClick1(_filter)">
          {{ _filter.name }}
        </v-tab>
      </v-tabs>

      <!-- subject & tags slection panel -->
      <v-expansion-panels v-for="(_subject, idx) in currentFilter.subjects" :key="idx+_subject.name">
        <v-expansion-panel>

          <!-- panel header -->
          <v-expansion-panel-header @click="onClick2(_subject)">
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

          <!-- panel header -->
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
      <v-btn style="margin-top: 30px;">
        검색
      </v-btn>
    </v-layout>

    <!-- display discover results -->
    <v-layout justify-start wrap style="max-width: 1000px; margin: 0 auto;">
      <v-hover v-slot="{ hover }" v-for="(_user, idx) in userDatas" :key="idx" style="width:230px; margin: 20px 10px;">
        <v-card hover>

          <!-- image section -->
          <v-img class="profile-card__hover" src="https://picsum.photos/200" height="200px">
          </v-img>

          <!-- description -->
          <v-card-title>
            {{ _user.username }}
          </v-card-title>
          <v-card-subtitle>
            {{ _user.email }}
          </v-card-subtitle>
          <v-card-text>
            {{ _user.summary }}
          </v-card-text>

          <!-- hover overlay -->
          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              {{ _user.summary }}
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

interface recruition {
  author: string,
  title: string,
  employmentType: string,
  pay: string,
  imageUrl: string,
  due: string,
}

interface profile {
  username: string,
  email: string,
  summary: string,
  imageUrl: string,
}

@Component
export default class DiscoverPage extends Vue {
  /* define variables */
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

  tags :tag[] = [];

  currentFilter = this.filters[0];

  userDatas :profile[] = [
    {
      username: "오주상",
      email: "dhwntkd412@snu.ac.kr",
      summary: "전역 하고 싶다",
      imageUrl: "asdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
    {
      username: "홍길동",
      email: "dhwntkd412@naver.com",
      summary: "자고싶다",
      imageUrl: "assdf",
    },
  ];

  recruitionDatas :recruition[] = [
    {
      author: "맥도날드",
      title: "맥도날드 레스토랑 관리직 매니저 트레이닝",
      employmentType: "정규직",
      pay: "보수 규정",
      imageUrl: "asdf",
      due: "2021-11-11",
    },
    {
      author: "아워홈",
      title: "아워홈 조리사 채용",
      employmentType: "계약직(1년 단위)",
      pay: "보수 규정",
      imageUrl: "asdf",
      due: "2021-11-11",
    },
  ]

  /* define methods */
  onClick1(val: filter): void{
    this.currentFilter = val;
  }

  onClick3(val: tag): void{
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    if (idx > -1) console.log(idx); /* this.tags.splice(idx, 1); */
    else this.tags.push(val);
  }

  onClick4(val: tag): void{
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    this.tags.splice(idx, 1);
  }
}
</script>

<style lg="css" scoped>
</style>
