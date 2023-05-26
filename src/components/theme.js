// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
      GoalTac: {
        1: '#4FD1C5',
        2: '#3182CE',
      },
      
    },

  }
);

export default theme;
