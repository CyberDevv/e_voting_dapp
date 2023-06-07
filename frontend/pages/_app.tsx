import '@/styles/globals.css';
import {
   createTheme,
   StyledEngineProvider,
   ThemeProvider,
} from '@mui/material';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MetamaskProvider } from '@/utils/MetamaskContext';

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
      <MetamaskProvider>
         <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
               <main>
                  <Component {...pageProps} />
                  <ToastContainer />
               </main>
            </StyledEngineProvider>
         </ThemeProvider>
      </MetamaskProvider>
   );
}
