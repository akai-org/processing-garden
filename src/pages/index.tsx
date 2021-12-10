import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import Learning from 'pages/learning';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Processing Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1">Processing Garden</Heading>
      <Learning />
      <Heading as="h4" size={'sm'}>
        Bitches...
      </Heading>
    </div>
  );
}
