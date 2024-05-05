export type Genre = 'action' | 'animation' | 'drama' | 'sci-fi';

export interface Movie {
  id: string;
  title: string;
  director: string;
  summary: string;
  genres: Genre[];
}

export interface Meta {
  totalCount: number;
}
