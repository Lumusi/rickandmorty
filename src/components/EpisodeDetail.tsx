'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Episode, Character, fetchSingleCharacter } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';

interface EpisodeDetailProps {
  episode: Episode;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ episode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  // Parse episode code (e.g., "S01E01")
  const seasonEpisode = episode.episode.match(/S(\d+)E(\d+)/);
  const season = seasonEpisode ? parseInt(seasonEpisode[1]) : null;
  const episodeNum = seasonEpisode ? parseInt(seasonEpisode[2]) : null;

  useEffect(() => {
    const loadCharacters = async () => {
      if (episode.characters.length === 0) return;
      
      setLoadingCharacters(true);
      
      try {
        const characterIds = episode.characters.map(url => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        // Fetch all characters instead of limiting to 20
        const characterPromises = characterIds.map(id => fetchSingleCharacter(id));
        const characterData = await Promise.all(characterPromises);
        
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoadingCharacters(false);
      }
    };
    
    loadCharacters();
  }, [episode.characters]);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/episodes" className="inline-block mb-6 text-blue-500 hover:underline">
        ← Back to Episodes
      </Link>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{episode.name}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {episode.episode}
            </div>
            {season && episodeNum && (
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                Season {season}, Episode {episodeNum}
              </div>
            )}
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Aired: {episode.air_date}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Characters ({episode.characters.length})</h2>
          
          {episode.characters.length === 0 ? (
            <p className="text-gray-600">No characters in this episode</p>
          ) : loadingCharacters ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                {characters.map(character => (
                  <Link href={`/character/${character.id}`} key={character.id}>
                    <div className="group hover:scale-105 transition-transform duration-200">
                      <div className="relative overflow-hidden rounded-lg shadow-md">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              character.status === 'Alive' ? 'bg-green-500' : 
                              character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                            }`}></span>
                            <p className="text-white text-sm font-medium truncate">{character.name}</p>
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

export default EpisodeDetail; 