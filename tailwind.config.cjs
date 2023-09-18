const colors = require('tailwindcss/colors');

const DEFAULT_COLOR = {
    ...colors,
    'primary'        : 'var(--color-primary)',
    'primary--dark'  : 'var(--color-primary--dark)',
    'primary--light' : 'var(--color-primary--light)',

    'secondary': 'var(--color-secondary)',

    'tertiary': 'var(--color-tertiary)',

    'border': 'var(--color-border)',

    'desc': 'var(--color-desc)',

    'bg': 'var(--color-bg)',

    'success': 'var(--color-success)',

    'error': 'var(--color-error)',

    transparent : 'transparent',
    current     : 'currentColor',
    white       : colors.white,
    black       : colors.black
};

module.exports = {
    darkMode : 'class',
    mode     : 'jit',
    purge    : [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
        // './src/pages/**/*.{js,jsx,ts,tsx}',
        // './src/components/**/*.{js,jsx,ts,tsx}',
        // './src/containers/**/*.{js,jsx,ts,tsx}',
        // './src/layout/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        screens: {
            mobile  : { 'max': '640px' },
            tablet  : '756px',
            laptop  : '1040px',
            desktop : '1280px',
            extra   : '1900px'
        },

        colors      : DEFAULT_COLOR,
        textColor   : DEFAULT_COLOR,
        borderColor : (theme) => ({
            ...theme('colors'),
            ...DEFAULT_COLOR
        }),
        extend: {
            boxShadow: {
                primary   : 'var(--box-shadow-primary)',
                secondary : 'var(--box-shadow-secondary)'
            },
            maxWidth: {
                "primary": 'var(--max-width-primary)'
            },
            minWidth: {
                0      : '0',
                '1/6'  : '16.7%',
                '1/5'  : '20%',
                '1/4'  : '25%',
                '1/3'  : '33.3%',
                '1/2'  : '50%',
                screen : '100vw'
            },
            spacing: {
                0  : '0',
                1  : '0.25rem',
                2  : '0.5rem',
                3  : '0.75rem',
                4  : '1rem',
                5  : '1.25rem',
                6  : '1.5rem',
                7  : '1.75rem',
                8  : '2rem',
                9  : '2.25rem',
                10 : '2.5rem',
                11 : '2.75rem',
                12 : '3rem',
                13 : '3.25rem',
                14 : '3.5rem',
                15 : '3.75rem',
                16 : '4rem'
            }
        }
    },
    variants: {
        extend: {
            backgroundColor   : ['active'],
            textColor         : ['hover'],
            backgroundOpacity : ['hover'],
            opacity           : ['active , hover'],
            transform         : ['hover'],
            width             : ['hover', 'focus'],
            boxShadow         : ['hover']
        }
    },
    plugins     : [],
    corePlugins : {
        preflight : false,
        maxWidth  : true,
        minWidth  : true,
        height    : true
    }
};
