import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Search, Film,  Sparkles, Heart, Play, Clapperboard, Popcorn } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  genres: string[];  
  overview: string;
}

interface MovieRaw {
  id: string;
  title: string;
  genres: string;
  overview: string;
}


const getRecommendations = (movies: Movie[], selectedTitle: string, topN: number = 10): Movie[] => {
  const query = selectedTitle.toLowerCase().trim();

  const availableGenres = ['action', 'adventure', 'animation', 'comedy', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery', 'romance', 'science fiction', 'tv movie', 'thriller', 'war', 'western', 'musical'];

  const titleToGenres: { [key: string]: string[] } = {
    'frozen': ['Animation', 'Family', 'Fantasy', 'Musical', 'Adventure'],
    'pride and prejudice': ['Romance', 'Drama'],
    'star wars': ['Science Fiction', 'Adventure', 'Action'],
    'harry potter': ['Fantasy', 'Adventure', 'Family'],
    'the matrix': ['Science Fiction', 'Action', 'Thriller'],
    'titanic': ['Romance', 'Drama'],
  };

  // 👉 Jika input adalah genre
  if (availableGenres.includes(query)) {
    const genreMovies = movies
      .filter(movie => movie.genres.some(genre => genre.toLowerCase() === query))
      .slice(0, topN);

    return genreMovies.length > 0
      ? genreMovies
      : movies.sort(() => Math.random() - 0.5).slice(0, topN);
  }

  // 👉 Jika input adalah judul yang masuk franchise khusus
  const franchiseKeywords = ['harry potter', 'star wars', 'the matrix', 'fast and furious', 'avengers']; // tambahkan franchise lain
  const matchedFranchise = franchiseKeywords.find(keyword => query.includes(keyword));

  if (matchedFranchise) {
    // Ambil semua film yang mengandung kata franchise, kecuali yang dicari
    const franchiseMovies = movies
      .filter(movie => movie.title.toLowerCase().includes(matchedFranchise) && movie.title.toLowerCase() !== query)
      .slice(0, topN);

    return franchiseMovies.length > 0
      ? franchiseMovies
      : movies.sort(() => Math.random() - 0.5).slice(0, topN);
  }

  // 👉 Jika input adalah judul populer dengan mapping genre
  if (titleToGenres[query]) {
    const matchedGenres = titleToGenres[query];
    const recommendedMovies = movies
      .filter(movie => movie.genres.some(genre => matchedGenres.includes(genre)) && movie.title.toLowerCase() !== query)
      .slice(0, topN);

    return recommendedMovies.length > 0
      ? recommendedMovies
      : movies.sort(() => Math.random() - 0.5).slice(0, topN);
  }

  // 👉 Jika input adalah judul yang ditemukan di dataset
  const targetMovie = movies.find(movie =>
    movie.title.toLowerCase().includes(query)
  );

  if (targetMovie) {
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

    return scoredMovies.length > 0
      ? scoredMovies
      : movies.sort(() => Math.random() - 0.5).slice(0, topN);
  }

  // 👉 Fallback terakhir: random movies
  return movies.sort(() => Math.random() - 0.5).slice(0, topN);
};



const allGenres = [
  "Comedy",
  "Romance",
  "Drama",
  "Action",
  "Thriller",
  "Sci-Fi",
  "Science Fiction",
  "Family",
  "Fantasy",
  "Adventure",
  "Mystery",
  "Musical"
];

const extractGenres = (genreString: string) => {
  const genresFound: string[] = [];

  allGenres.forEach(genre => {
    const regex = new RegExp(`\\b${genre}\\b`, 'i'); // exact word match, case insensitive
    if (regex.test(genreString)) {
      genresFound.push(genre);
    }
  });

  return genresFound;
};


const genreColors = {
  'Comedy': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Romance': 'bg-pink-100 text-pink-800 border-pink-200',
  'Drama': 'bg-purple-100 text-purple-800 border-purple-200',
  'Action': 'bg-red-100 text-red-800 border-red-200',
  'Thriller': 'bg-gray-100 text-gray-800 border-gray-200',
  'Science Fiction': 'bg-blue-100 text-blue-800 border-blue-200',
  'Family': 'bg-green-100 text-green-800 border-green-200',
  'Fantasy': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Adventure': 'bg-orange-100 text-orange-800 border-orange-200',
  'Mystery': 'bg-slate-100 text-slate-800 border-slate-200',
  'Musical': 'bg-violet-100 text-violet-800 border-violet-200'
};

const movieEmojis = ['❤️‍🔥', '🎞️', '🔥', '🎠', '👀', '🎇', '🪐', '🎈', '🍀', '🔭'];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/movies_metadata.csv') // Accessible from public folder
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        return response.text();
      })
      .then(csvText => {
        Papa.parse<MovieRaw>(csvText, {
          header: true, // Treat first row as headers
          skipEmptyLines: true,
          complete: (result) => {
            const parsedMovies: Movie[] = result.data.map((row: any) => ({
              id: parseInt(row.id, 10), // Convert id to number
              title: row.title,
              genres: extractGenres(row.genres),
              overview: row.overview,
            }));
            setMovies(parsedMovies);
            setLoading(false);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (title: string) => {
    if (!title.trim()) {
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Simulate loading for better UX
    setTimeout(() => {
      const recs = getRecommendations(movies, title);
      setRecommendations(recs);
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-gradient-to-r from-[#FEC2E6] to-[#C6DA83] p-3 rounded-full mr-3">
                <img src='https://cdn-icons-png.flaticon.com/512/7170/7170823.png' width={70}/>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#DC4D88] to-[#FF8C71] bg-clip-text text-transparent">
                MADmovies
              </h1>
              <Clapperboard className="w-8 h-8 text-[#FAAA53] ml-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What kind of movie are you in the mood for?
            </h2>
            <p className="text-gray-500">
              Tell us a movie title or genre you love!
            </p>
          </div>

          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for movies or genres..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 text-lg"
              />
            </div>
            <button
              onClick={() => handleSearch(query)}
              disabled={!query.trim() || loading}
              className="w-full mt-4 bg-gradient-to-r from-[#DC4D88] via-[#FAAA53] to-[#DC4D88] text-white py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 bor
                  der-b-2 border-white mr-2"></div>
                  Finding Magic...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find My Kind Of Movies
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-bounce mb-4">
                  <Popcorn className="w-16 h-16 text-violet-400 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">
                  Surfing through our movie collection...
                </p>
              </div>
            ) : recommendations.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Perfect Matches for You! 🎉
                  </h3>
                  <p className="text-gray-600">
                    Here are {recommendations.length} movies we think you'll love
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-[#FEC2E6] to-[#C6DA83] rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                          <span className="text-2xl">
                            {movieEmojis[index % movieEmojis.length]}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                              {movie.title}
                            </h4>
                            <Heart className="w-5 h-5 text-gray-300 group-hover:text-pink-500 transition-colors cursor-pointer" />
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {movie.genres.map((genre) => (
                              <span
                                key={genre}
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  genreColors[genre as keyof typeof genreColors] || 'bg-gray-100 text-gray-800 border-gray-200'
                                }`}
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {movie.overview}
                          </p>
                          
                          <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            <Play className="w-4 h-4 mr-1" />
                            Watch Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Search className="w-16 h-16 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No movies found
                </h3>
                <p className="text-gray-500">
                  Try searching for a different movie title or genre!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!hasSearched && (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="relative inline-block">
                <Film className="w-24 h-24 text-violet-300 mx-auto animate-bounce" />
                <Sparkles className="w-8 h-8 text-pink-400 absolute -top-5 -right-10 animate-pulse" />
                <Sparkles className="w-8 h-8 text-pink-400 absolute -bottom-2 -left-10 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Ready to discover amazing movies? 🍿
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Search for a movie you love or try genres like "comedy", "romance", or "adventure" to get personalized recommendations!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400">
        <p className="flex items-center justify-center">
          Made with <Heart className="w-4 h-4 text-pink-400 mx-1" /> by Audrey, Marco and Daniel
        </p>
      </div>
    </div>
  );
}