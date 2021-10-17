import type {
  IRecordsComponentProps,
} from "./IRecordsData";

const testDataCredits: IRecordsComponentProps = {
  inputLabels: {
    date: "일자",
    location: "위치",
    title: "활동명",
    value: "점수",
  },
  summaryNumbers: [{
    label: "가점",
    value: 0,
    color: "blue",
  }, {
    label: "감점",
    value: 0,
    color: "red",
  },
  ],
  cardContentsList: [],
  isLastInputNumber: true,
  kind: "가감점",
};

const testDataAwards: IRecordsComponentProps = {
  inputLabels: {
    date: "일자",
    location: "기관",
    title: "상훈명",
    value: "훈격",
  },
  summaryNumbers: [{
    label: "개수",
    value: 0,
    color: "blue",
  },
  ],
  cardContentsList: [],
  isLastInputNumber: false,
  kind: "상훈",
};

export { testDataAwards, testDataCredits };
