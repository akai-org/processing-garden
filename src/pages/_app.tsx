import { ChakraProvider } from '@chakra-ui/provider';
import { Layout } from 'components';
import { SessionProvider } from 'next-auth/react';

import { AppProps } from 'next/app';
import { theme } from '../theme';
import Head from 'next/head';

import '../main.scss';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <>
      <Head>
        <title>Processing Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
