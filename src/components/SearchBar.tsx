'use client';

import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search...',
  initialValue = ''
}) => {
  const [query, setQuery] = useState(initialValue);
  
  // Update the query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="input w-full p-4 pl-10 text-gray-800 border-2 border-gray-200 rounded-full bg-gray-50 shadow-sm focus:border-rickMortyRed"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-rickMortyRed text-white rounded-full px-6 py-2.5 hover:bg-opacity-90 hover:shadow-lg disabled:opacity-50 transition-colors"
          disabled={!query.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 