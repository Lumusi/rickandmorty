import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="portal-gradient rounded-2xl shadow-xl p-8 sm:p-16">
        <h1 className="font-extrabold text-white mb-6 text-glow text-center">
          Rick and Morty Universe Explorer
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-center">
          Explore characters, locations, and episodes from the Rick and Morty series using the official Rick and Morty API.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/characters" className="bg-rickMortyRed text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors shadow-md">
            Start Exploring
          </Link>
          <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full px-6 py-3">
            About the API
          </a>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard 
          title="Characters" 
          description="Discover all characters from the show with detailed information about their status, species, origin, and more."
          link="/characters"
          theme="character"
          icon={
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="9" cy="10" r="1.5" fill="currentColor" />
              <circle cx="15" cy="10" r="1.5" fill="currentColor" />
              <path d="M8.5 15C8.5 15 10 17 12 17C14 17 15.5 15 15.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <CategoryCard 
          title="Locations" 
          description="Explore various locations across the multiverse, including dimensions, planets, and secret facilities."
          link="/locations"
          theme="location"
          icon={
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" />
              <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
        <CategoryCard 
          title="Episodes" 
          description="Browse through all episodes of the series with air dates and character appearances."
          link="/episodes"
          theme="episode"
          icon={
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M10 10L15 12L10 14V10Z" fill="currentColor" />
            </svg>
          }
        />
      </div>

      <section className="card section">
        <h2 className="mb-6">About This Project</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            This application is built using Next.js and the Rick and Morty API. It allows you to explore the rich universe of the show with an intuitive interface.
          </p>
          <p className="mb-4">
            The Rick and Morty API is a REST and GraphQL API based on the television show Rick and Morty. You can access data about hundreds of characters, images, locations and episodes.
          </p>
          <p className="mb-4">
            <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              View the official Rick and Morty API documentation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  description: string;
  link: string;
  theme: 'character' | 'location' | 'episode';
  icon: React.ReactNode;
}

function CategoryCard({ title, description, link, theme, icon }: CategoryCardProps) {
  const themeStyles = {
    character: 'rick-gradient',
    location: 'portal-gradient',
    episode: 'episode-gradient'
  };

  return (
    <Link href={link} className="block h-full">
      <div className="card hover-scale h-full shadow-rick flex flex-col">
        <div className={`${themeStyles[theme]} p-6 rounded-t-lg`}>
          <div className="mb-3 text-white">{icon}</div>
          <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        </div>
        <div className="p-6 bg-white rounded-b-lg flex-grow flex flex-col">
          <p className="text-gray-600 flex-grow">{description}</p>
          <div className="mt-4 text-rickBlue font-medium flex items-center">
            Explore {title} 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
