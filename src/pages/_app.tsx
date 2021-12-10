import { AppProps } from 'next/app';
import React from 'react'
import '../main.scss';

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }
  
  export default App