import { LongCard } from 'src/app/components/card-button-long/long-card';

export interface CardBlock {
  heading: string;
  cardData: LongCard[];
}
export const longCardData: CardBlock[] = [
  {
    heading: 'Training',
    cardData: [
      {
        icon: 'assets/images/vhmooc.svg',
        title: 'Visible Human Massive Open Online Course (VHMOOC)',
        body: 'A free course that empowers anyone to help construct and properly use the evolving Human Reference Atlas',
        externalLink:
          'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc',
      },
      {
        icon: 'assets/images/hra-sop.svg',
        title: 'Human Reference Atlas Standard Operating Procedures',
        body: 'Standard operating procedures for Human Reference Atlas construction, visualization, and usage',
        route: 'standard-operating-procedures',
      },
    ],
  },
  {
    heading: 'Outreach',
    cardData: [
      {
        icon: 'assets/images/kaggle.svg',
        title: 'Kaggle #1: HuBMAP - Hacking the Kidney',
        body: 'Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction',
        route: 'kaggle-one',
      },
      {
        icon: 'assets/images/kaggle.svg',
        title: 'Kaggle #2: HuBMAP + HPA - Hacking the Human Body',
        body: 'Algorithm development challenges that engage teams from around the globe to develop code for Human Reference Atlas construction',
        route: 'kaggle-two',
      },
      {
        icon: 'assets/images/24hr.svg',
        title: '24 Hour Human Reference Atlas Event',
        body: 'One sentence summary here',
        route: '24-hr-hra-event',
      },
      {
        icon: 'assets/images/scrollytelling.svg',
        title: 'Scrollytelling Series',
        body: 'An engaging collection of stories designed to introduce the Human Reference Atlas to a general audience',
        route: 'scrollytelling-series',
      }
    ],
  },
];
