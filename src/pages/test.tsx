import {
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import Head from 'next/head';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import styles from './test.module.scss';
import '@codesandbox/sandpack-react/dist/index.css';

const template = `import * as p5 from 'p5';

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function keyPressed() {
  console.log(keyCode)
}

window.setup = setup
window.draw = draw
window.keyPressed = keyPressed;`;

export default function Test() {
  const [code, setCode] = React.useState(template);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        <Editor
          width="50vw"
          height="100vh"
          value={code}
          onChange={(value = '') => setCode(value)}
          language="javascript"
          theme="vs-dark"
          options={{}}
          // className={styles.editor}
        />
        <SandpackProvider
          template="react-ts"
          customSetup={{
            entry: '/index.js',
            dependencies: { p5: 'latest' },
            files: {
              '/index.js': {
                code: code,
                active: true,
              },
            },
          }}
        >
          <SandpackThemeProvider>
            <SandpackPreview showRefreshButton={false} />
          </SandpackThemeProvider>
        </SandpackProvider>
      </Flex>
    </div>
  );
}
