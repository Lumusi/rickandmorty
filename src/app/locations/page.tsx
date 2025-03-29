'use client';

import React, { useState, useEffect } from 'react';
import { fetchLocations } from '@/services/api';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import LocationCard from '@/components/LocationCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Location } from '@/services/api';

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchLocations(currentPage, searchQuery);
        setLocations(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('Failed to load locations. Please try again later.');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Locations</h1>
        <p className="text-gray-600">Explore all locations from the Rick and Morty multiverse.</p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search for locations..." 
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : locations.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium text-gray-700">No locations found</h2>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
} 