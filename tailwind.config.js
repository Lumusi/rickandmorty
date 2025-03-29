/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'hover:bg-portalGreen/10',
    'from-aquaMint',
    'to-lightBlue',
    'from-paleYellow',
    'to-brightOrange',
    'from-rickBlue',
    'from-rickMortyRed',
    'to-rickMortyRed',
    'to-brightRed',
    'bg-rickMortyRed',
    'text-rickMortyRed',
    'border-rickMortyRed',
    'bg-opacity-80',
    'bg-opacity-90',
    'border-opacity-30',
    'border-opacity-50',
    'hover:border-opacity-50'
  ],
  theme: {
  	extend: {
  		colors: {
  			rickGreen: {
          DEFAULT: 'var(--rickGreen)',
          200: 'var(--rickGreen)'
        },
  			rickBlue: {
          DEFAULT: 'var(--rickBlue)',
          200: 'var(--rickBlue)'
        },
  			rickTeal: {
          DEFAULT: 'var(--rickTeal)',
          200: 'var(--rickTeal)'
        },
  			mortyYellow: {
          DEFAULT: 'var(--mortyYellow)',
          200: 'var(--mortyYellow)'
        },
  			portalGreen: {
          DEFAULT: 'var(--portalGreen)',
          200: 'var(--portalGreen)'
        },
  			darkPortal: {
          DEFAULT: 'var(--darkPortal)',
          200: 'var(--darkPortal)'
        },
        brightRed: {
          DEFAULT: 'var(--brightRed)',
          200: 'var(--brightRed)'
        },
        paleYellow: {
          DEFAULT: 'var(--paleYellow)',
          200: 'var(--paleYellow)'
        },
        brightOrange: {
          DEFAULT: 'var(--brightOrange)',
          200: 'var(--brightOrange)'
        },
        lightBlue: {
          DEFAULT: 'var(--lightBlue)',
          200: 'var(--lightBlue)'
        },
        mediumBrown: {
          DEFAULT: 'var(--mediumBrown)',
          200: 'var(--mediumBrown)'
        },
        aquaMint: {
          DEFAULT: 'var(--aquaMint)',
          200: 'var(--aquaMint)'
        },
  			schwiftyPink: {
          DEFAULT: 'var(--schwiftyPink)',
          200: 'var(--schwiftyPink)'
        },
        rickMortyRed: {
          DEFAULT: 'var(--rickMortyRed)',
          200: 'var(--rickMortyRed)'
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			rick: '0 4px 12px rgba(225, 40, 46, 0.3)',
  			portal: '0 4px 12px rgba(183, 228, 249, 0.3)',
        schwifty: '0 4px 12px rgba(250, 228, 139, 0.3)',
        aqua: '0 4px 12px rgba(183, 228, 249, 0.3)',
        redglow: '0 4px 12px rgba(225, 40, 46, 0.5)'
  		},
  		backgroundImage: {
  			'rick-gradient': 'linear-gradient(90deg, rgba(36, 50, 95, 0.8), rgba(225, 40, 46, 0.9))',
  			'portal-gradient': 'linear-gradient(90deg, rgba(36, 50, 95, 0.8), rgba(225, 40, 46, 0.9))',
        'morty-gradient': 'linear-gradient(90deg, rgba(225, 40, 46, 0.8), rgba(36, 50, 95, 0.8))',
        'schwifty-gradient': 'linear-gradient(90deg, rgba(36, 50, 95, 0.9), rgba(225, 40, 46, 0.8))',
        'aqua-gradient': 'linear-gradient(90deg, rgba(105, 200, 236, 0.9), rgba(166, 238, 230, 0.8))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      scale: {
        '102': '1.02',
      },
  	}
  },
  plugins: [
    {
      handler({ addUtilities }) {
        addUtilities({
          '.text-glow': {
            textShadow: '0 0 8px var(--rickMortyRed), 0 0 15px var(--brightRed)',
          },
          '.text-red-glow': {
            textShadow: '0 0 8px var(--rickMortyRed), 0 0 15px var(--brightRed)',
          },
          '.text-blue-glow': {
            textShadow: '0 0 8px var(--lightBlue), 0 0 15px var(--aquaMint)',
          },
          '.text-yellow-glow': {
            textShadow: '0 0 8px var(--paleYellow), 0 0 15px var(--brightOrange)',
          },
          '.text-schwifty-glow': {
            textShadow: '0 0 8px var(--paleYellow), 0 0 15px var(--brightOrange)',
          },
          '.rick-shadow': {
            boxShadow: '0 4px 12px rgba(225, 40, 46, 0.3)',
          },
          '.portal-shadow': {
            boxShadow: '0 4px 12px rgba(183, 228, 249, 0.3)',
          },
          '.schwifty-shadow': {
            boxShadow: '0 4px 12px rgba(250, 228, 139, 0.3)',
          },
          '.aqua-shadow': {
            boxShadow: '0 4px 12px rgba(183, 228, 249, 0.3)',
          },
          '.redglow-shadow': {
            boxShadow: '0 4px 12px rgba(225, 40, 46, 0.5)',
          },
          '.rick-gradient': {
            background: 'linear-gradient(90deg, rgba(36, 50, 95, 0.8), rgba(225, 40, 46, 0.9))',
          },
          '.portal-gradient': {
            background: 'linear-gradient(90deg, rgba(36, 50, 95, 0.8), rgba(225, 40, 46, 0.9))',
          },
          '.morty-gradient': {
            background: 'linear-gradient(90deg, rgba(225, 40, 46, 0.8), rgba(36, 50, 95, 0.8))',
          },
          '.schwifty-gradient': {
            background: 'linear-gradient(90deg, rgba(36, 50, 95, 0.9), rgba(225, 40, 46, 0.8))',
          },
          '.aqua-gradient': {
            background: 'linear-gradient(90deg, rgba(105, 200, 236, 0.9), rgba(166, 238, 230, 0.8))',
          },
          '.hero-gradient': {
            background: 'linear-gradient(135deg, rgba(225, 40, 46, 0.9), rgba(36, 50, 95, 0.7))',
          },
        })
      }
    },
      require("tailwindcss-animate")
],
} 