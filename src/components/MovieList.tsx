import type { Movie } from '../utils/csvParser';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {movies.map(movie => (
        <div key={movie.id} className="border rounded p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
          <p className="text-gray-600 mb-2"><strong>Genres:</strong> {movie.genres.join(', ')}</p>
          <p className="text-gray-700">{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};
