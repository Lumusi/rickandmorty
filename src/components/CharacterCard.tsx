import React from 'react';
import Link from 'next/link';
import { Character } from '@/services/api';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  // Status indicator color mapping
  const statusVariant = {
    Alive: 'bg-green-500 hover:bg-green-500',
    Dead: 'bg-red-500 hover:bg-red-500',
    unknown: 'bg-gray-500 hover:bg-gray-500'
  }[character.status] || 'bg-gray-500 hover:bg-gray-500';

  return (
    <Link href={`/character/${character.id}`} className="block h-full transition-transform duration-300 hover:scale-105">
      <Card className="h-full flex flex-col overflow-hidden border-gray-100">
        <div className="relative">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-56 object-contain"
          />
          <div className="absolute top-3 right-3 bg-black/70 py-1 px-3 rounded-full flex items-center">
            <span className={cn("inline-block w-2 h-2 rounded-full mr-2", statusVariant)}></span>
            <span className="text-white text-xs font-medium">{character.status}</span>
          </div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h2 className="text-xl font-bold text-foreground mb-1 line-clamp-1">{character.name}</h2>
          <div className="mb-3">
            <span className="text-muted-foreground font-medium">{character.species}</span>
            {character.type && <span className="text-muted-foreground text-sm ml-2">({character.type})</span>}
          </div>
          <div className="space-y-2 flex-grow">
            <div>
              <span className="text-muted-foreground text-sm block">Last known location:</span>
              <p className="truncate">{character.location.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm block">Origin:</span>
              <p className="truncate">{character.origin.name}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary" className="text-xs">
              Featured in {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard; 