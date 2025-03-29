'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Location, Character, fetchSingleCharacter } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';

interface LocationDetailProps {
  location: Location;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location }) => {
  const [residents, setResidents] = useState<Character[]>([]);
  const [loadingResidents, setLoadingResidents] = useState(false);

  // Status indicator color
  const getStatusColor = (status: string) => {
    return {
      'Alive': 'bg-green-500',
      'Dead': 'bg-red-500',
      'unknown': 'bg-gray-500'
    }[status] || 'bg-gray-500';
  };

  useEffect(() => {
    const loadResidents = async () => {
      if (location.residents.length === 0) return;
      
      setLoadingResidents(true);
      
      try {
        const characterIds = location.residents.map(url => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        // Process in batches of 10 to avoid overwhelming the API
        const batchSize = 10;
        const characters: Character[] = [];
        
        for (let i = 0; i < characterIds.length; i += batchSize) {
          const batch = characterIds.slice(i, i + batchSize);
          try {
            const batchPromises = batch.map(id => fetchSingleCharacter(id));
            const batchResults = await Promise.allSettled(batchPromises);
            
            // Add successful results to the characters array
            batchResults.forEach((result, index) => {
              if (result.status === 'fulfilled') {
                characters.push(result.value);
              } else {
                console.error(`Failed to fetch character ${batch[index]}:`, result.reason);
              }
            });
          } catch (batchError) {
            console.error(`Error processing batch ${i}-${i+batchSize}:`, batchError);
          }
        }
        
        setResidents(characters);
      } catch (error) {
        console.error('Error fetching residents:', error);
      } finally {
        setLoadingResidents(false);
      }
    };
    
    loadResidents();
  }, [location.residents]);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/locations" className="inline-block mb-6 text-blue-500 hover:underline">
        ← Back to Locations
      </Link>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{location.name}</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Type: {location.type || 'Unknown'}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Dimension: {location.dimension || 'Unknown'}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Residents ({location.residents.length})</h2>
          
          {location.residents.length === 0 ? (
            <p className="text-gray-600">No known residents</p>
          ) : loadingResidents ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                {residents.map(resident => (
                  <Link href={`/character/${resident.id}`} key={resident.id}>
                    <div className="group hover:scale-105 transition-transform duration-200">
                      <div className="relative overflow-hidden rounded-lg shadow-md">
                        <img
                          src={resident.image}
                          alt={resident.name}
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(resident.status)}`}></span>
                            <p className="text-white text-sm font-medium truncate">{resident.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetail; 