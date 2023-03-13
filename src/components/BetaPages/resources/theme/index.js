import { extendTheme } from '@chakra-ui/react';

const colors = {
  red: {
    light: 'hsl(13, 100%, 96%)',
    hover: '#f99076',
    bright: 'hsl(12, 88%, 59%)',
  },
  blue: {
    light: 'hsl(227, 12%, 61%)',
    dark: 'hsl(228, 39%, 23%)',
    veryDark: 'hsl(233, 12%, 13%)',
  },
  gray: 'hsl(0, 0%, 98%)',
};

export default extendTheme({
  styles: {
    global: {
      'html, body': {
        color: colors.blue.dark,
      },
    },
  },
  fonts: {
    body: 'Be Vietnam Pro, sans-serif',
  },
  colors: {
    red: {
      light: colors.red.light,
      bright: colors.red.bright,
    },
    blue: {
      light: colors.blue.light,
      dark: colors.blue.dark,
      veryDark: colors.blue.veryDark,
    },
    gray: colors.gray,
  },
  layerStyles: {
    bgRed: {
      bg: colors.red.bright,
      color: colors.gray,
    },
  },
  components: {
    Button: {
      variants: {
        outline: {
          border: '0',
          fontWeight: '500',
          _hover: {
            color: colors.red.hover,
          },
        },
        solid: {
          borderRadius: '40px',
          bg: colors.red.bright,
          padding: '1.8rem 2rem',
          boxShadow: 'lg',
          color: colors.gray,
          _hover: {
            bg: colors.red.hover,
          },
        },
        bgLight: {
          bg: colors.gray,
          color: colors.red.bright,
          padding: '1.8rem 2rem',
          borderRadius: '40px',
          _hover: {
            color: colors.red.hover,
          },
        },
        footer: {
          border: '0',
          fontWeight: '200',
          color: colors.gray,
          _hover: {
            color: colors.red.bright,
          },
        },
        icon: {
          bg: 'auto',
        },
      },
    },
    VStack: {
      baseStyle: {},
    },
  },
});
