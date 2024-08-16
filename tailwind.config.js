/** @type {import('tailwindcss').Config} */
const {join} = require("path");
module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
    join(__dirname, './src/**/!(*.stories|*.spec).{ts,html}'),

  ],
  theme: {
  screens: {
      'xxsm': '250px',
      'xsm': '340px',
      'ssm':'440px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  }  },
  plugins: [
    require('flowbite/plugin')
  ],
}

