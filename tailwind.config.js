/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
