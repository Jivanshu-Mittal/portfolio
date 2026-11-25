import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0b0c',
          2: '#121214',
        },
        paper: '#f3f0ea',
        mist: '#8a8a8f',
        'mist-2': '#5a5a5e',
        secondary: '#a3a3a8',
        brand: {
          400: '#FF7B52',
          500: '#ff5b2e',
          600: '#e85028',
          solid: '#FF7B52',
        },
        primary: '#1a1a1d',
        tertiary: '#6b6b6f',
      },
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'marquee': ['clamp(1.6rem, 5.2vw, 4.25rem)', { lineHeight: '1.0', fontWeight: '500' }],
        'mobile-menu': ['clamp(2.5rem, 13vw, 4rem)', { lineHeight: '1.0', fontWeight: '500', letterSpacing: '-0.02em' }],
        'footer-brand': ['clamp(2.25rem, 11.4vw, 13.5rem)', { lineHeight: '0.86', fontWeight: '700', letterSpacing: '-0.055em' }],
        'what-number': ['clamp(8rem, 17vw, 16rem)', { lineHeight: '1.0', fontWeight: '700' }],
      },
      spacing: {
        'container-x': 'var(--container-padding)',
      },
      boxShadow: {
        'xs-skeuomorphic': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)',
        'ping-ring': '0 0 14px #FF5B2E',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.9)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-sweep': {
          '0%': { backgroundPosition: '150% center' },
          '100%': { backgroundPosition: '-50% center' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(101%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'blur-in': {
          '0%': { filter: 'blur(10px)', opacity: '0', transform: 'translateY(50px)' },
          '100%': { filter: 'blur(0)', opacity: '1', transform: 'translateY(0)' },
        },
        'stagger-in': {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'gradient-sweep': 'gradient-sweep 3s linear infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blur-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stagger-in': 'stagger-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(110deg, #FF7B52 0%, #FF7B52 35%, #FFE0D5 50%, #FF7B52 65%, #FF7B52 100%)',
        'radial-glow-tr': 'radial-gradient(60%_50%_at_75%_10%, rgba(255,91,46,0.13), transparent_70%)',
        'radial-glow-bl': 'radial-gradient(55%_60%_at_50%_100%, rgba(255,91,46,0.16), transparent_70%)',
        'contact-glow': 'radial-gradient(60%_50%_at_50%_100%, rgba(255,91,46,0.15), transparent_70%)',
      },
      backgroundSize: {
        '200%': '200% auto',
      },
    },
  },
  plugins: [],
};

export default config;