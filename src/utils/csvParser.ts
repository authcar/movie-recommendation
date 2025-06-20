import Papa from 'papaparse';

export interface Movie {
  id: number;
  title: string;
  genres: string[];  
  overview: string;
}

export const parseCSV = (data: string): Movie[] => {
  const parsed = Papa.parse(data, { header: true });

  return parsed.data
    .filter((row: any) => row.title && row.genres && row.overview)
    .map((row: any, index: number) => ({
      id: index + 1,
      title: row.title,
      genres: row.genres.split(' '), // split by space sesuai format csv kamu
      overview: row.overview,
    }));
};