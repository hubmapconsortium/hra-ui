export interface FtuVersionData {
    version: string
    rows: FtuData[]
}

export interface FtuData {
    label: string;
    links: Download[];
}

export interface Download {
    label: string
    link: string,
}