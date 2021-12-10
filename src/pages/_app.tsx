import { AppProps } from 'next/app';
import React from 'react'
import '../main.sass';

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }
  
  export default App