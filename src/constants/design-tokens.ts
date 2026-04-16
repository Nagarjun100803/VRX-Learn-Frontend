/**
 * VRX Learn Design Tokens
 * Inspired by Vercel Geist Design System
 */

export const DESIGN_TOKENS = {
  colors: {
    bg: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#eaeaea',
    },
    text: {
      primary: '#171717',
      secondary: '#4d4d4d',
      tertiary: '#666666',
      inverted: '#ffffff',
    },
    border: {
      subtle: 'rgba(0,0,0,0.08)',
      medium: 'rgba(0,0,0,0.16)',
    },
    accent: {
      blue: '#0a72ef',
      pink: '#de1d8d',
      red: '#ff5b4f',
    },
  },
  typography: {
    fonts: {
      sans: '"Geist", "Inter", ui-sans-serif, system-ui, sans-serif',
      mono: '"Geist Mono", ui-monospace, SFMono-Regular, monospace',
    },
    letterSpacing: {
      'tight-xl': '-2.4px',
      'tight-lg': '-1.28px',
      'tight-md': '-0.96px',
    },
    sizes: {
      display: '48px',
      section: '40px',
      cardTitle: '24px',
      body: '16px',
      caption: '12px',
    },
  },
  shadows: {
    border: '0px 0px 0px 1px rgba(0,0,0,0.08)',
    card: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.03)',
    focus: '0 0 0 2px #ffffff, 0 0 0 4px #0a72ef',
  },
  radius: {
    button: '6px',
    card: '8px',
    image: '12px',
  },
} as const;
