export interface Movie {
  id: number;
  title: string;
  director: string;
  summary: string;
  genres: [str: string];
}

export interface Meta {
  totalCount: number;
}
