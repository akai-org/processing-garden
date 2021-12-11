import { ChakraProvider } from '@chakra-ui/provider';
import { Layout } from 'components';
import { SessionProvider } from 'next-auth/react';

import { AppProps } from 'next/app';
import { theme } from '../theme';
import Head from 'next/head';

import '../main.scss';
import AchievementProvider from 'context/AchievementContext';

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
          <AchievementProvider>
            {routesWithoutLayout.includes(currentRoute) ? (
              <Component {...pageProps} />
            ) : (
              <Layout fullWidth={currentRoute === '/challanges/[id]'}>
                <Component {...pageProps} />
              </Layout>
            )}
          </AchievementProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
