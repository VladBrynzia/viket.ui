import { createStitches } from '@stitches/react';

export const { styled, css, getCssText } = createStitches({
  theme: {
    fonts: {
      montserrat: 'Montserrat, sans-serif',
    },
    colors: {
      black: '#000000',
      popupAbsoluteBg: 'rgba(0,0,0,0.4)',
      white: '#ffffff',
      orange: '#FD7E08',
      violet: '#9900CC',
      navBackgroundViolet: '#390147',
      violetLighter: '#430153',
      inputLightViolet: '#F9EBFD',
      feedbackPinkLightBackground: '#FBF6FF',
      formBorder: '#F6D9FF',
      feedbackBg: '#F9F9F9',
      category: "#140612",
      warning: '#ff2400',
      link: "#E87BF8",
    },
  },
  media: {
    xxs: '(min-width: 520px)',
    xs: '(min-width: 768px)',
    sm: '(min-width: 960px)',
    md: '(min-width: 1280px)',
    lg: '(min-width: 1400px)',
    xl: '(min-width: 1920px)',
  },
});