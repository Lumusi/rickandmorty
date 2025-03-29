// Rick and Morty API types
export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

// Combined search results type
export interface AllSearchResults {
  characters: ApiResponse<Character>;
  locations: ApiResponse<Location>;
  episodes: ApiResponse<Episode>;
}

// API endpoints
const API_BASE_URL = 'https://rickandmortyapi.com/api';
const endpoints = {
  characters: `${API_BASE_URL}/character`,
  locations: `${API_BASE_URL}/location`,
  episodes: `${API_BASE_URL}/episode`,
};

// API functions
export const fetchCharacters = async (page = 1, name = ''): Promise<ApiResponse<Character>> => {
  const url = new URL(endpoints.characters);
  url.searchParams.append('page', page.toString());
  if (name) url.searchParams.append('name', name);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
};

export const fetchLocations = async (page = 1, name = ''): Promise<ApiResponse<Location>> => {
  const url = new URL(endpoints.locations);
  url.searchParams.append('page', page.toString());
  if (name) url.searchParams.append('name', name);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
};

export const fetchEpisodes = async (page = 1, name = ''): Promise<ApiResponse<Episode>> => {
  const url = new URL(endpoints.episodes);
  url.searchParams.append('page', page.toString());
  if (name) url.searchParams.append('name', name);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
};

// New function to search all content types at once
export const searchAllContent = async (query: string, page = 1): Promise<AllSearchResults> => {
  try {
    // We'll make parallel requests to all endpoints
    const [charactersPromise, locationsPromise, episodesPromise] = await Promise.allSettled([
      fetchCharacters(page, query),
      fetchLocations(page, query),
      fetchEpisodes(page, query)
    ]);

    // Process character results
    const characters = charactersPromise.status === 'fulfilled' 
      ? charactersPromise.value 
      : { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    
    // Process location results
    const locations = locationsPromise.status === 'fulfilled' 
      ? locationsPromise.value 
      : { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    
    // Process episode results
    const episodes = episodesPromise.status === 'fulfilled' 
      ? episodesPromise.value 
      : { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };

    return { characters, locations, episodes };
  } catch (error) {
    console.error('Error searching all content:', error);
    // Return empty results if there's an error
    return {
      characters: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
      locations: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
      episodes: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    };
  }
};

/**
 * Fetches a resource with retry logic
 */
async function fetchWithRetry<T>(
  url: string, 
  maxRetries = 3,
  delay = 500
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`Fetch attempt ${attempt + 1} failed for ${url}. Retrying...`);
      
      // Wait with exponential backoff
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError!;
}

export const fetchSingleCharacter = async (id: number): Promise<Character> => {
  return fetchWithRetry<Character>(`${endpoints.characters}/${id}`);
};

export const fetchSingleLocation = async (id: number): Promise<Location> => {
  return fetchWithRetry<Location>(`${endpoints.locations}/${id}`);
};

export const fetchSingleEpisode = async (id: number): Promise<Episode> => {
  return fetchWithRetry<Episode>(`${endpoints.episodes}/${id}`);
}; 