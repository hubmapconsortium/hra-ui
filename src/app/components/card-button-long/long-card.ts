export interface LongCard {
    icon: string;
    title: string;
    externalLink?: string;
    body: string;
    route?: string;
    color?: string;
}

export interface CardBlock {
    heading: string;
    cardData: LongCard[];
    headerSize?: string;
    id?: string;
}
