import { ChakraProvider } from '@chakra-ui/provider';
import { Layout } from 'components';
import { SessionProvider } from 'next-auth/react';

import { AppProps } from 'next/app';
import { theme } from '../theme';
import Head from 'next/head';

import '../main.scss';

const routesWithoutLayout = ['/login'];

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const currentRoute = appProps.router.pathname;

  return (
    <>
      <Head>
        <title>Processing Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          {routesWithoutLayout.includes(currentRoute) ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
