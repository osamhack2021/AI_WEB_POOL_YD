export interface IRecordsLabels {
    date: string,
    location: string,
    title: string,
    value: string,
}

export interface IRecordsDisplay extends IRecordsLabels {
    id: number,
}

export interface IRecordsSummary {
    label: string,
    value: number,
    color: string,
}

export interface IRecordsComponentProps {
    inputLabels: IRecordsLabels,
    summaryNumbers: Array<IRecordsSummary>,
    cardContentsList: Array<IRecordsDisplay>,
    isLastInputNumber: boolean,
    kind: string
}
