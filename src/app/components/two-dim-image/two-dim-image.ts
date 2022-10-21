export interface TissueData {
    name: string
    image?: string
    expandedImage?: string
    threeDimImage?: string,
    alt?: string
    url: string
    svg?: string
}

export interface OrganData {
    name: string,
    image: string,
    tissueData?: TissueData[]
}

export interface VersionOrgans {
    version: string,
    organData: OrganData[]
}