import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import Head from 'next/head';
import React from 'react';

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
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Editor
          width="40vw"
          height="40vh"
          value={code}
          onChange={(value = '') => setCode(value)}
          language="javascript"
          theme="vs-dark"
          options={{}}
        />
        <SandpackProvider
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
          <SandpackPreview />
        </SandpackProvider>
      </main>
    </div>
  );
}
