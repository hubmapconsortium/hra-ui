export interface TissueDetails {
    tissueName: string
    tissueImage: string
}

export interface OrganData {
    organName: string,
    tissueData: TissueDetails[]
}