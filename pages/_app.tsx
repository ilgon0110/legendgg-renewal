import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global-style';
import type { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import Head from 'next/head';
import Layout from '@components/Layout';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { fetcherAndParsing } from '@utilities/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title></title>
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SWRConfig value={{ fetcher: fetcherAndParsing }}>
            <SessionProvider session={pageProps.session} basePath={process.env.NEXTAUTH_URL}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </SWRConfig>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
