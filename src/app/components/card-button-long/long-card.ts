export interface LongCard {
    icon: string;
    title: string;
    externalLink?: string;
    body: string;
    route?: string;
}

export interface CardBlock {
    heading: string;
    cardData: LongCard[];
}
