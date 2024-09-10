export interface IMangaFrame {
  id: number;
  image: string;
}

export interface ICompactManga {
  id: string;
  title: string;
  cover: string;
  description?: string;
  slug: string;
}

export interface IMangaChapter {
  id: string;
  data: string;
  title: string;
  index: number;
}

export interface IManga {
  id: string;
  title: string;
  cover: string;
  description: string;
  year: number;
  rating: 1 | 2 | 3 | 4 | 5;
  type: string;
  genres: { genre: { name: string; id: string } }[];
  status: string;

  chapters: IMangaChapter[];
}
