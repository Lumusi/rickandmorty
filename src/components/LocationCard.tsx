import React from 'react';
import Link from 'next/link';
import { Location } from '@/services/api';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Link href={`/location/${location.id}`} className="block h-full transition-transform duration-300 hover:scale-105">
      <Card className="h-full flex flex-col overflow-hidden border-gray-100">
        <div className="bg-rickBlue h-20 rounded-t-lg p-4 flex items-center">
          <h2 className="text-xl font-bold text-white line-clamp-2">{location.name}</h2>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="space-y-4 flex-grow">
            <div>
              <span className="text-muted-foreground text-sm block">Type:</span>
              <p className="text-foreground font-medium">{location.type || 'Unknown'}</p>
            </div>
            
            <div>
              <span className="text-muted-foreground text-sm block">Dimension:</span>
              <p className="text-foreground font-medium">{location.dimension || 'Unknown'}</p>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Residents:</span>
                <span className="badge badge-red">
                  {location.residents.length}
                </span>
              </div>
              
              {location.residents.length === 0 ? (
                <p className="text-muted-foreground text-sm mt-1">No known residents</p>
              ) : (
                <p className="text-muted-foreground text-sm mt-1">
                  {location.residents.length} character{location.residents.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard; 