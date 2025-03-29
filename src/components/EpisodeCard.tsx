import React from 'react';
import Link from 'next/link';
import { Episode } from '@/services/api';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  // Parse episode code (e.g., "S01E01")
  const seasonEpisode = episode.episode.match(/S(\d+)E(\d+)/);
  const season = seasonEpisode ? parseInt(seasonEpisode[1]) : null;
  const episodeNum = seasonEpisode ? parseInt(seasonEpisode[2]) : null;
  
  return (
    <Link href={`/episode/${episode.id}`} className="block h-full transition-transform duration-300 hover:scale-105">
      <Card className="h-full flex flex-col overflow-hidden border-gray-100">
        <div className="episode-gradient h-24 rounded-t-lg p-4 flex flex-col justify-center">
          <span className="text-white/80 text-sm font-medium">{episode.episode}</span>
          <h2 className="text-xl font-bold text-white line-clamp-1">{episode.name}</h2>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="space-y-4 flex-grow">
            <div>
              <span className="text-muted-foreground text-sm block">Air Date:</span>
              <p className="text-foreground font-medium">{episode.air_date}</p>
            </div>
            
            {season && episodeNum && (
              <div>
                <span className="text-muted-foreground text-sm block">Season/Episode:</span>
                <p className="text-foreground font-medium">Season {season}, Episode {episodeNum}</p>
              </div>
            )}
            
            <div className="pt-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Characters:</span>
                <span className="badge badge-red">
                  {episode.characters.length}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mt-1">
                {episode.characters.length} character{episode.characters.length !== 1 ? 's' : ''} featured
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EpisodeCard; 