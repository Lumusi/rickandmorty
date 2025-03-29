'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Character, Episode, fetchSingleEpisode } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  // Status indicator color
  const getStatusColor = (status: string) => {
    return {
      'Alive': 'bg-green-500',
      'Dead': 'bg-red-500',
      'unknown': 'bg-gray-500'
    }[status] || 'bg-gray-500';
  };
  
  useEffect(() => {
    const loadEpisodes = async () => {
      if (character.episode.length === 0) return;
      
      setLoadingEpisodes(true);
      
      try {
        const episodeIds = character.episode.map(url => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        // Limit to first 5 episodes to avoid too many requests
        const limitedIds = episodeIds.slice(0, 5);
        const episodePromises = limitedIds.map(id => fetchSingleEpisode(id));
        const episodesData = await Promise.all(episodePromises);
        
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoadingEpisodes(false);
      }
    };
    
    loadEpisodes();
  }, [character.episode]);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/characters" className="inline-block mb-6 text-blue-500 hover:underline">
        ← Back to Characters
      </Link>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(character.status)}`}></span>
              <span className="text-white">{character.status}</span>
            </div>
          </div>
          
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{character.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-lg text-gray-600">{character.species} {character.type && `• ${character.type}`}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-gray-500 text-sm font-medium">Gender</h2>
                <p className="text-gray-800 text-lg">{character.gender}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-gray-500 text-sm font-medium">Origin</h2>
                <p className="text-gray-800 text-lg">{character.origin.name}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-gray-500 text-sm font-medium">Last known location</h2>
                <p className="text-gray-800 text-lg">{character.location.name}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-gray-500 text-sm font-medium">Number of episodes</h2>
                <p className="text-gray-800 text-lg">{character.episode.length}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Episode appearances</h2>
              
              {loadingEpisodes ? (
                <LoadingSpinner />
              ) : (
                <div>
                  <div className="space-y-3 mb-4">
                    {episodes.map(episode => (
                      <Link href={`/episode/${episode.id}`} key={episode.id}>
                        <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">{episode.name}</p>
                            <p className="text-sm text-gray-500">{episode.episode} • {episode.air_date}</p>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {character.episode.length > 5 && (
                    <div className="text-center">
                      <Link href={`/episodes?character=${character.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                        View all {character.episode.length} episodes
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail; 