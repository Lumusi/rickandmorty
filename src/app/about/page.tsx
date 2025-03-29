import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-portal p-8">
        <h1 className="text-4xl font-bold text-[var(--rickTeal)] mb-6">About Rick and Morty Explorer</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to the Rick and Morty Explorer, a fan-made web application designed to help you
            navigate the vast multiverse of the hit animated series "Rick and Morty."
          </p>
          
          <h2 className="text-2xl font-bold text-[var(--rickTeal)] mt-8 mb-4">Project Overview</h2>
          <p>
            This application was built using Next.js, React, and TypeScript, leveraging the public
            <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" className="text-[var(--rickBlue)] hover:underline mx-1">
              Rick and Morty API
            </a>
            to provide detailed information about characters, locations, and episodes from the show.
          </p>
          
          <h2 className="text-2xl font-bold text-[var(--rickTeal)] mt-8 mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browse through all characters from the Rick and Morty universe</li>
            <li>Explore various locations and dimensions from the show</li>
            <li>Find information about all episodes across all seasons</li>
            <li>Search functionality to quickly find specific characters, locations, or episodes</li>
            <li>Responsive design for optimal viewing on all devices</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-[var(--rickTeal)] mt-8 mb-4">Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js (React framework)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Rick and Morty API</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-[var(--rickTeal)] mt-8 mb-4">About Rick and Morty</h2>
          <p>
            Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon.
            The series follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson
            Morty Smith, who split their time between domestic life and interdimensional adventures.
          </p>
          
          <div className="mt-10 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold text-[var(--rickTeal)] mb-3">Disclaimer</h3>
            <p className="text-sm">
              This is a fan-made project and is not affiliated with Adult Swim, Cartoon Network, or the creators of Rick and Morty.
              All character information, images, and related content are provided through the public Rick and Morty API for
              educational and entertainment purposes only.
            </p>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Link href="/" className="btn-primary inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 