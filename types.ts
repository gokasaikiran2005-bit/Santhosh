export type Theme = 'light' | 'dark';

export interface FileData {
  file?: File;
  name: string;
  url: string;
}

export type IconName = 'X' | 'LinkedIn' | 'Gmail' | 'Phone' | 'Location';

export interface SocialLink {
  icon: IconName;
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface BannerData {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  backgroundType: 'color' | 'image' | 'video';
  backgroundUrl: string;
  backgroundMaxSize: number;
}

export interface HeroData {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

export interface PageBackground {
  type: 'color' | 'image' | 'video';
  value: string; // Color hex or object URL
}
