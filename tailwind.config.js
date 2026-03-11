/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        reunion: {
          green:      '#1a5c38',
          'green-light': '#2d8a56',
          turquoise:  '#009fb7',
          'turquoise-light': '#4dd0e1',
          lava:       '#d9472b',
          'lava-light': '#f56a4e',
          sun:        '#f9a825',
          'sun-light': '#ffc107',
          sand:       '#f5ede0',
          'sand-dark': '#e8d5b7',
          dark:       '#0d1b2a',
          'dark-mid': '#152232',
          cream:      '#fdf8f2',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Nunito"', 'sans-serif'],
      },
      backgroundImage: {
        'tropical-gradient': 'linear-gradient(135deg, #1a5c38 0%, #009fb7 50%, #0d1b2a 100%)',
        'lava-gradient':     'linear-gradient(135deg, #d9472b 0%, #f9a825 100%)',
        'sand-gradient':     'linear-gradient(180deg, #fdf8f2 0%, #f5ede0 100%)',
      },
      boxShadow: {
        'tropical': '0 8px 32px rgba(0, 159, 183, 0.2)',
        'lava':     '0 8px 32px rgba(217, 71, 43, 0.3)',
        'card':     '0 4px 20px rgba(13, 27, 42, 0.12)',
        'card-hover': '0 16px 40px rgba(13, 27, 42, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
