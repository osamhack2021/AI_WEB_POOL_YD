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
    value: 73,
    color: "blue",
  }, {
    label: "감점",
    value: 73,
    color: "red",
  },
  ],
  cardContentsList: [
    {
      id: 16723,
      date: "2021-10-10",
      location: "항공작전전대",
      title: "2021 추석 한마음 행사",
      value: "3점",
    },
    {
      id: 16724,
      date: "2021-10-10",
      location: "항공작전전대",
      title: "2021 추석 한마음 행사",
      value: "3점",
    },
  ],
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
    label: "갯수",
    value: 7,
    color: "blue",
  },
  ],
  cardContentsList: [
    {
      id: 234234,
      date: "2021-10-10",
      location: "항공작전전대",
      title: "으뜸병사",
      value: "임명",
    },
    {
      id: 234234,
      date: "2021-11-11",
      location: "항공작전전대",
      title: "관심병사",
      value: "임명",
    },
  ],
  isLastInputNumber: false,
  kind: "상훈",
};

export { testDataAwards, testDataCredits };
