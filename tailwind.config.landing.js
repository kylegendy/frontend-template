/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/landing/**/*.{tsx,ts,css}"],
    theme: {
        extend: {},
        fontSize: {
            'sm': '0.8rem',
            'base': '1rem',
            'xl': '2rem',
            '2xl': '2.25rem',
            '3xl': '2.5rem',
            '4xl': '2.75rem',
            '5xl': '3rem',
        }
    },
    plugins: [
        require('daisyui'),
        function ({ addBase, theme }) {
            addBase({
                'h1': {
                    fontSize: theme('fontSize.2xl'),
                    '@screen md': {
                        fontSize: theme('fontSize.4xl'),
                    },
                    '@screen lg': {
                        fontSize: theme('fontSize.5xl'),
                    },
                    '@screen xl': {
                        fontSize: theme('fontSize.6xl'),
                    },
                    '@screen 2xl': {
                        fontSize: theme('fontSize.7xl'),
                    },
                },
                'h2': {
                    fontSize: theme('fontSize.xl'),
                    '@screen md': {
                        fontSize: theme('fontSize.3xl'),
                    },
                    '@screen lg': {
                        fontSize: theme('fontSize.4xl'),
                    },
                    '@screen xl': {
                        fontSize: theme('fontSize.5xl'),
                    },
                    '@screen 2xl': {
                        fontSize: theme('fontSize.6xl'),
                    },
                },
                'h3': {
                    fontSize: theme('fontSize.lg'),
                    '@screen md': {
                        fontSize: theme('fontSize.2xl'),
                    },
                    '@screen lg': {
                        fontSize: theme('fontSize.3xl'),
                    },
                    '@screen xl': {
                        fontSize: theme('fontSize.4xl'),
                    },
                    '@screen 2xl': {
                        fontSize: theme('fontSize.5xl'),
                    },
                },
                'p': {
                    fontSize: theme('fontSize.base'),
                },
            });
        }
    ],
};