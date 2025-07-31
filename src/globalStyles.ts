import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{ theme: any }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: ${({ theme }) => theme.animation.transition};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.secondary};
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: ${({ theme }) => theme.animation.transition};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Responsive design */
  @media (max-width: 1200px) {
    html {
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }

    body {
      line-height: 1.5;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.3;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }

    body {
      line-height: 1.4;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    button, a {
      min-height: 44px;
      min-width: 44px;
    }

    input, textarea, select {
      font-size: 16px !important; /* Prevents zoom on iOS */
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
  }

  /* Dark mode support for system preference */
  @media (prefers-color-scheme: dark) {
    /* This will be overridden by our theme system, but provides fallback */
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.border} ${({ theme }) => theme.colors.surface};
  }

  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.surface};
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a, a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }
  }

  /* Container queries support (future-proofing) */
  @container (max-width: 400px) {
    .responsive-text {
      font-size: 0.9em;
    }
  }

  /* Landscape orientation adjustments */
  @media (orientation: landscape) and (max-height: 500px) {
    .header {
      height: 50px;
    }
  }

  /* Ultra-wide screen support */
  @media (min-width: 1920px) {
    html {
      font-size: 18px;
    }
  }
`;

export default GlobalStyles; 