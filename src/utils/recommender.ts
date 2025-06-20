import type { Movie } from './csvParser';

export const getRecommendations = (movies: Movie[], selectedTitle: string, topN: number = 10) => {
  // Cari film dengan judul yang mirip
  const targetMovie = movies.find(movie =>
    movie.title.toLowerCase().includes(selectedTitle.toLowerCase())
  );

  if (targetMovie) {
    // Kalau ketemu, rekomendasikan berdasarkan genre
    const targetGenres = targetMovie.genres;

    const scoredMovies = movies
      .filter(movie => movie.title.toLowerCase() !== targetMovie.title.toLowerCase())
      .map(movie => {
        const commonGenres = movie.genres.filter(genre => targetGenres.includes(genre)).length;
        return { ...movie, score: commonGenres };
      })
      .filter(movie => movie.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);

    return scoredMovies;
  } else {
    // Fallback: Cari genre yang mirip dengan kata kunci
    const possibleGenres = ['Comedy', 'Romance', 'Drama', 'Action', 'Thriller', 'Sci-Fi', 'Family'];

    // Cari genre yang mengandung kata kunci
    const matchedGenres = possibleGenres.filter(genre =>
      genre.toLowerCase().includes(selectedTitle.toLowerCase())
    );

    // Kalau ketemu genre yang mirip
    if (matchedGenres.length > 0) {
      const fallbackMovies = movies
        .filter(movie => movie.genres.some(genre => matchedGenres.includes(genre)))
        .slice(0, topN);

      return fallbackMovies;
    }

    // Kalau tidak ada genre yang mirip, kembalikan film populer secara default
    return movies.slice(0, topN);
  }
};
