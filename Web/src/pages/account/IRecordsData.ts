export interface IRecordsLabels {
    date: string,
    location: string,
    title: string,
    value: string,
}

export interface IRecordsDisplay extends IRecordsLabels {
    id: string,
}

export interface IRecordsSummary {
    label: string,
    value: number,
    color: string,
}