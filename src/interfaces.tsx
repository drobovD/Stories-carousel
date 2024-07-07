import { RefObject } from "react";
import SwiperCore from "swiper";

export interface HeaderProps {
  soundImg: string;
  closeImg: string;
  soundWidth: string;
  soundHeight: string;
  closeSize: string;
}

export interface SlideHeaderProps {
  avatar: string;
  name: string;
  closeImg: string;
  closeSize: string;
}

export interface SlideFooterProps {
  soundImg: string;
  soundWidth: string;
  soundHeight: string;
}

export interface SlideProps {
  stories: Array<StoryProps>;
  slideIndex: number;
  activeSlideIndex: number;
  prevSlideHandle: Function;
  nextSlideHandle: Function;
  avatar: string;
  name: string;
}

export interface StoryProps {
  storyUrl: string;
  id: number;
  labels: Array<Label>;
}

export interface ExtendedStoryProps {
  action: StoryProps;
  setDelay: Function;
  slideIndex: number;
  activeSlideIndex: number;
  storyIndex: number;
  activeStoryIndex: number;
  swiperRef: RefObject<SwiperCore>;
  storiesLength: number;
  prevSlideHandle: Function;
  nextSlideHandle: Function;
}

export interface ProgressBarProps {
  progress: number;
  activeStoryIndex: number;
  storiesCount: Array<StoryProps>;
}

export interface ProgressBarItemProps {
  progress: number;
  activeStoryIndex: number;
  storyIndex: number;
}

export interface Label {
  name: string;
  x: number;
  y: number;
  link: string;
}

export interface ScreenBreakpoints {
  xs: string;
  lg: string;
  xl: string;
}

export interface Devices {
  mobile: string;
  laptop: string;
  desktop: string;
}

export interface Data {
  idOrganisation: number;
  name: string;
  avatar: string;
  organisationLink: string;
  stories: Array<StoryProps>;
}
