import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 mr-4 w-80 rounded"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};
