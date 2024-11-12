/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aws: {
          blue: '#232f3e',
          orange: '#ff9900',
          purple: '#8c4fff',
          'light-blue': '#0073bb',
          'dark-blue': '#161e2d',
          'light-bg': '#f8f9fa',
          'hover-blue': '#2a3950'
        }
      },
      boxShadow: {
        'aws': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'aws-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};