import { ChakraProvider } from '@chakra-ui/provider';
import { Layout } from 'components';
import { SessionProvider } from 'next-auth/react';

import { AppProps } from 'next/app';
import { theme } from '../theme';
import Head from 'next/head';

import '../main.scss';
import React from 'react';

const routesWithoutLayout = ['/login'];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const currentRoute = appProps.router.pathname;

  const Providers: React.FC = ({ children }) => (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );

  if (routesWithoutLayout.includes(currentRoute)) {
    return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
    );
  }

  return (
    <>
      <Head>
        <title>Processing Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}
