import { LongCard } from "src/app/components/card-button-long/long-card";

export interface abc {
    heading: string;
    cardData: LongCard[]
}
export const longCardData: abc[] = [
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
                body: "Standard operating procedures for Human Reference Atlas construction, visualization, and usage"
            }
        ]
    },
    {
        heading: "Outreach",
        cardData: [
            {
                icon: "assets/images/kaggle.png",
                title: "Kaggle Competition and Awards 2021",
                body: "Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction",
            },
            {
                icon: "assets/images/kaggle.png",
                title: "Kaggle Competition and Awards 2022",
                body: "Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction"
            }
        ]
    }
]