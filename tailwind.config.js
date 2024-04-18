/** @type {import('tailwindcss').Config} */
const {join} = require("path");
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
    join(__dirname, './src/**/!(*.stories|*.spec).{ts,html}'),

  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

