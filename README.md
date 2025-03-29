# Rick and Morty Explorer

A web application that allows users to explore the Rick and Morty universe using the official [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- Browse and search for characters, locations, and episodes from the Rick and Morty series
- View detailed information about each character, location, and episode
- Pagination for handling large amounts of data
- Responsive design that works on mobile, tablet, and desktop devices

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Rick and Morty API](https://rickandmortyapi.com/) - Data source

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/rickandmorty.git
   cd rickandmorty
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

This project integrates with the Rick and Morty API, which provides data about:
- Characters
- Locations
- Episodes

The API endpoints used in this project:
- `https://rickandmortyapi.com/api/character` - Get all characters
- `https://rickandmortyapi.com/api/location` - Get all locations
- `https://rickandmortyapi.com/api/episode` - Get all episodes

## Project Structure

```
src/
├── app/               # Next.js app directory
│   ├── character/     # Character details page
│   ├── characters/    # Characters list page
│   ├── episode/       # Episode details page
│   ├── episodes/      # Episodes list page
│   ├── location/      # Location details page
│   ├── locations/     # Locations list page
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout component
│   └── page.tsx       # Home page
├── components/        # Reusable UI components
├── services/          # API services
└── types/             # TypeScript type definitions
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the data
- [Rick and Morty](https://www.adultswim.com/videos/rick-and-morty) created by Justin Roiland and Dan Harmon
