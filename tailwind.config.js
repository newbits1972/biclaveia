/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#A855F7',
        'brand-blue': '#3B82F6',
        'brand-green': '#10B981',
        'brand-light-bg': '#F8F9FF',
        'brand-dark-blue': '#1E293B',
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(120deg, #f3e8ff 0%, #e0f2fe 100%)',
        'gradient-hero': 'linear-gradient(100deg, #d1fae5, #bfdbfe, #e9d5ff)',
        'gradient-professional-card': 'linear-gradient(135deg, #8B5CF6, #6366F1)',
        'gradient-page-background': 'linear-gradient(to bottom, #f0fdfa, #ffffff)'
      }
    },
  },
  plugins: [],
}
