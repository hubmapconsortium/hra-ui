import { LongCard } from "src/app/components/card-button-long/long-card";

export interface CardBlock {
    heading: string;
    cardData: LongCard[]
}
export const longCardData: CardBlock[] = [
    {
        heading: "Training",
        cardData: [
            {
                icon: "assets/images/vhmooc.png",
                title: "Visible Human Massive Open Online Course (VHMOOC)",
                body: "A free course that empowers anyone to help construct and properly use the evolving Human Reference Atlas",
                externalLink: 'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc'
            },
            {
                icon: "assets/images/hra-sop.png",
                title: "Human Reference Atlas Standard Operating Procedures",
                body: "Standard operating procedures for Human Reference Atlas construction, visualization, and usage",
                route: 'ccf-hra-sop'
            }
        ]
    },
    {
        heading: "Outreach",
        cardData: [
            {
                icon: "assets/images/kaggle.png",
                title: "Kaggle #1: HuBMAP - Hacking the Kidney",
                body: "Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction",
                route: 'ccf-kaggle-twentyone'
            },
            {
                icon: "assets/images/kaggle.png",
                title: "Kaggle #2: HuBMAP + HPA - Hacking the Human Body",
                body: "Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction",
                route: 'ccf-kaggle-two'
            }
        ]
    }
]