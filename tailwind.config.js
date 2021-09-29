module.exports = {
  mode: 'jit',
  purge: [
    './dist/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'hover': 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
        'fire': 'var(--fire)',
        'cyan': 'var(--cyan)',
        'magnolia': 'var(--magnolia)',
        'forest': 'var(--forest)',
        'independence': 'var(--independence)',
      },
      boxShadow: {
        'outline-fire': '0 0 0 2px var(--fire)',
        'outline-cyan': '0 0 0 2px var(--cyan)',
        'outline-magnolia': '0 0 0 2px var(--magnolia)',
        'outline-forest': '0 0 0 2px var(--forest)',
        'outline-independence': '0 0 0 2px var(--independence)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
