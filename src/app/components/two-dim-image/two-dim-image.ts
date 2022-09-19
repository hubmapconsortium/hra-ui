export interface TissueDetails {
    tissueName: string
    tissueImage: string
    dialog_image?: string
}

export interface OrganData {
    organName: string,
    tissueData: TissueDetails[]
}