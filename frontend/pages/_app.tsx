import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import {
   createTheme,
   StyledEngineProvider,
   ThemeProvider,
} from '@mui/material';

const roboto = Roboto({
   weight: ['400', '500', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
});

declare module '@mui/material/styles' {
   interface BreakpointOverrides {
      xs: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
      '2xl': true;
   }
}

const theme = createTheme({
   breakpoints: {
      values: {
         xs: 0,
         sm: 640,
         md: 768,
         lg: 1024,
         xl: 1280,
         '2xl': 1536,
      },
   },
   palette: {
      mode: 'dark',
   },
});

export default function App({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={theme}>
         <StyledEngineProvider injectFirst>
            <main className={`${roboto.className}`}>
               <Component {...pageProps} />
            </main>
         </StyledEngineProvider>
      </ThemeProvider>
   );
}
