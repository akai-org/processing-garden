import { ChakraProvider } from '@chakra-ui/provider';
import { Layout } from 'components';

import { AppProps } from 'next/app';
import { theme } from '../theme';

import '../main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
