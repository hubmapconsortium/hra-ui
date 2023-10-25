export interface PrizeCard {
  title: string;
  presentedBy?: string;
  orgImage?: string;
  winner: Winner[];
  // kaggleId?: string,
  // button?: Button[],
  userImage?: UserImage[];
  matDivider: boolean;
  alt: string;
}

export interface Button {
  label: string;
  link: string;
}

export interface Winner {
  winner: string;
  kaggleId?: string;
  button?: Button[];
}

interface UserImage {
  image: string;
  alt: string;
}