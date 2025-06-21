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
    .filter((row: any) => row.title && row.overview && row.genres)
    .map((row: any, index: number) => {
      let genreList: string[] = [];
      try {
        const genres = JSON.parse(row.genres.replace(/'/g, '"'));
        genreList = genres.map((g: any) => g.name);
      } catch (error) {
        // Skip rows with invalid genres format
      }

      return {
        id: index + 1,
        title: row.title,
        genres: genreList,
        overview: row.overview,
      };
    })
    .filter(movie => movie.genres.length > 0);
};