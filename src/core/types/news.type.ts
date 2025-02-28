export type NewsType = {
  id: string;
  title: string;
  url: string;
  site: string;
  time: number;
  favicon_url: string;
};

export type NewsList = {
  stories: NewsType[];
};
