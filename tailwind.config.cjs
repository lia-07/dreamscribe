/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        cabinet: ['"CabinetGrotesk"'],
        supreme: ['"Supreme"']
      }
    }
  },

  plugins: []
};

module.exports = config;
