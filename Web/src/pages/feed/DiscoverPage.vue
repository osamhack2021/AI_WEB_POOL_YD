<template>
  <div>
    <v-layout column align-center> 

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

      <div v-for="(_subject, idx) in currentFilter.subjects" :key="idx">
        <div class="filter-chooser">
          <v-chip label>
            {{ _subject.name }}
          </v-chip>
          <div class="filter-chooser_tags" @click="onClick2(_subject)">
           <v-chip close v-for="(_tag, idx) in
             tags.filter(tag => tag.subject === _subject.name)" :key="idx" @click:close="onClick4(_tag)">
              {{ _tag.tag }}
            </v-chip>
          </div>
        </div>
        <v-expand-transition>
          <v-chip-group v-if="modalOn && currentSubject === _subject" mandatory>
            <v-chip v-for="(_tag, idx) in _subject.tags" :key="idx"
            @click="onClick3({ subject: currentSubject.name, tag: _tag})">
              {{ _tag }}
            </v-chip>
          </v-chip-group>
        </v-expand-transition>
      </div>

      <v-chip-group>
        <v-chip close v-for="(_tag, idx) in tags" :key="idx" @click:close="onClick4(_tag)">
         {{ _tag.tag }}
        </v-chip>
      </v-chip-group>
    </v-layout>
    <v-layout>
      <v-card v-for="(_data, idx) in datas" :key="idx">

      </v-card>
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
          tags: ["이병", "일병", "상병", "병장"],
        },
        {
          name: "병과",
          tags: ["정보", "공병"],
        },
        {
          name: "관심 기업",
          tags: ["삼성전자"],
        },
      ],
    },
    {
      name: "POOL",
      subjects: [
        {
          name: "계급",
          tags: ["이병", "일병", "상병", "병장"],
        },
        {
          name: "병과",
          tags: ["정보", "공병"],
        },
        {
          name: "관심 기업",
          tags: ["삼성전자"],
        },
      ],
    },
    {
      name: "채용 공고",
      subjects: [
        {
          name: "우대 계급",
          tags: ["없음", "계급 무관", "하사 이상", "소위 이상", "소령 이상", "준장 이상"],
        },
        {
          name: "관련 병과",
          tags: ["정보", "공병"],
        },
        {
          name: "직군 분류",
          tags: ["생상관리"],
        },
      ],
    },
  ];

  tags :tag[] = [];

  currentFilter = this.filters[0];
  currentSubject = this.filters[0].subjects[0];
  modalOn = false;

  userDatas = [
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
      imageUrl: "assdf"
    }
  ];

  recruitionDatas = [
    {

    }
  ]

  /* define methods */
  onClick1(val: filter): void{
    this.currentFilter = val;
  }

  onClick2(val: subject): void {
    if (val === this.currentSubject) this.modalOn = !this.modalOn;
    else this.modalOn = true;
    this.currentSubject = val;
  }

  onClick3(val: tag): void{
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    if (idx > -1) this.tags.splice(idx, 1);
    else this.tags.push(val);
  }

  onClick4(val: tag): void{
    const idx = this.tags.findIndex((el) => el.subject === val.subject && el.tag === val.tag);
    console.log(val);
    console.log(idx);
    this.tags.splice(idx, 1);
  }
}
</script>

<style lg="css" scoped>
  .filter-chooser{
    display: flex;
  }

  .filter-chooser_tags{
    margin-left : 10px;
    width : 300px;
    background-color : #ffffff;
  }

  .filter-chooser_tags:hover{
    background-color : rgba(0,0,0,0.1);
  }
</style>
