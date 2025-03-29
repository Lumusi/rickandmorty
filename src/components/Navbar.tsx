'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/characters', label: 'Characters' },
    { href: '/locations', label: 'Locations' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-rickMortyRed via-rickBlue to-rickMortyRed shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 mr-2 relative overflow-hidden rounded-full bg-rickMortyRed border-2 border-white rick-shadow">
                <img 
                  src="/favicon.ico" 
                  alt="Rick and Morty Icon" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white text-red-glow group-hover:scale-105 transition-transform duration-300">
                Rick & Morty Explorer
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mx-1",
                  isActive(link.href)
                    ? "bg-rickMortyRed text-white font-bold"
                    : "text-white hover:bg-rickBlue hover:text-white hover:text-glow"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Search Icon/Form */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative mx-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-white bg-opacity-90 text-gray-800 rounded-full py-1 px-4 pl-9 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-rickMortyRed"
                  autoFocus
                  onBlur={handleSearchBlur}
                />
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <button type="submit" className="sr-only">Search</button>
              </form>
            ) : (
              <button 
                onClick={handleSearchClick}
                className="text-white p-2 rounded-lg hover:bg-rickBlue hover:text-white hover:text-glow transition-colors duration-200 mx-1"
                aria-label="Search"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            )}
            
            <ThemeToggle />
          </div>
          
          {/* Mobile menu using shadcn Sheet */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Search Icon/Form for Mobile */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-white bg-opacity-90 text-gray-800 rounded-full py-1 px-4 pl-9 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-rickMortyRed"
                  autoFocus
                  onBlur={handleSearchBlur}
                />
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <button type="submit" className="sr-only">Search</button>
              </form>
            ) : (
              <button 
                onClick={handleSearchClick}
                className="text-white p-2 rounded-lg hover:bg-rickBlue hover:text-white hover:text-glow transition-colors duration-200"
                aria-label="Search"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            )}
            
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-rickBlue hover:text-glow hover:bg-rickMortyRed">
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-rickBlue border-l-2 border-rickMortyRed">
                <div className="py-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium w-full text-left",
                        isActive(link.href)
                          ? "bg-rickMortyRed text-white font-bold"
                          : "text-white hover:bg-rickBlue hover:text-white hover:text-red-glow"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 