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

function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((json) => json)
      .then((json) => JSON.parse(json));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title></title>
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SWRConfig value={{ fetcher: fetcher }}>
            <SessionProvider session={pageProps.session}>
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
