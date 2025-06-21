import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };
  

  return (
    <div className="mb-6 flex justify-center">
       <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full pl-12 pr-4 py-4 border-2 border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 text-lg"
              />

      
      <button
              onClick={() => onSearch(query)}
              disabled={!query.trim() || loading}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Finding Magic...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find My Movies
                </div>
              )}
            </button>
    </div>
  );
};
