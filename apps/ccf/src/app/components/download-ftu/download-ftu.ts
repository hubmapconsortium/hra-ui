export interface FtuVersionData {
  version: string;
  rows: FtuData[];
}

export interface FtuData {
  label: string;
  url: string;
  links: Download[];
  releaseVersion: string;
  dot: string;
}

export interface Download {
  label: string;
  link: string;
}
