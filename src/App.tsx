import { useEffect, useState } from 'react';
import type{ Movie } from './utils/csvParser';
import { parseCSV } from './utils/csvParser';
import { getRecommendations } from './utils/recommender';
import { SearchBar } from './components/SearchBar';
import { MovieList } from './components/MovieList';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('/movies_metadata.csv')
      .then(res => res.text())
      .then(data => {
        const parsed = parseCSV(data);
        console.log('Parsed Movies:', parsed);
        setMovies(parsed);
      });
  }, []);

  const handleSearch = (title: string) => {
  if (!title.trim()) {
    alert('Please enter a movie title.');
    return;
  }

  const recs = getRecommendations(movies, title);

    if (recs.length === 0) {
      alert('Movie not found or no recommendations available.');
    }

    setRecommendations(recs);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Recommendation</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={recommendations} />
    </div>
  );
}

export default App;
