import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8 w-64 h-64 relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Portal background */}
          <circle cx="100" cy="100" r="90" fill="#243c5a" />
          <circle cx="100" cy="100" r="80" fill="#39ff14" className="opacity-60" />
          
          {/* Swirl effects */}
          <path d="M100,20 Q140,60 100,100 Q60,140 100,180 Q140,140 100,100 Q60,60 100,20" 
                stroke="#55b1f3" 
                strokeWidth="3" 
                fill="none"
                className="animate-[spin_10s_linear_infinite]" />
          
          {/* Morty panicked face */}
          <circle cx="100" cy="100" r="40" fill="#f0e14a" />
          <ellipse cx="85" cy="90" rx="10" ry="12" fill="white" />
          <ellipse cx="115" cy="90" rx="10" ry="12" fill="white" />
          <circle cx="85" cy="90" r="5" fill="black" />
          <circle cx="115" cy="90" r="5" fill="black" />
          <path d="M80,120 Q100,130 120,120" stroke="black" strokeWidth="3" fill="none" />
          
          {/* 404 text on top */}
          <text x="100" y="180" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">404</text>
        </svg>
      </div>
      
      <h1 className="text-5xl font-extrabold text-[var(--rickTeal)] mb-4 text-glow">Aw Jeez!</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Looks like you're lost in a dimension we haven't discovered yet. This page doesn't exist in our universe!
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/" 
          className="bg-[var(--rickGreen)] text-[var(--darkPortal)] px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors shadow-md"
        >
          Back to Home Dimension
        </Link>
        
        <Link 
          href="/characters" 
          className="bg-[var(--rickBlue)] text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors shadow-md"
        >
          Find Characters
        </Link>
      </div>
      
      <div className="mt-8 text-gray-500 italic">
        "Sometimes science is more art than science, Morty. A lot of people don't get that."
      </div>
    </div>
  );
} 