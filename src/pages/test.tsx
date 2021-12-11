import {
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import React from 'react';
import '@codesandbox/sandpack-react/dist/index.css';
import Leaderboard, { Record } from 'components/Leaderboard/Leaderboard';
import theme from 'editorTheme.json';

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

  const editor = (
    <Editor
      options={{ minimap: { enabled: false } }}
      onMount={(editor, monaco) => {
        monaco.editor.defineTheme('vitesse-dark-processing-garden', theme);
        monaco.editor.setTheme('vitesse-dark-processing-garden');
      }}
      width="50vw"
      height="100vh"
      value={code}
      onChange={(value = '') => setCode(value)}
      language="javascript"
    />
  );

  const preview = (
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
      <SandpackThemeProvider theme={{}}>
        <SandpackPreview showRefreshButton={false} />
      </SandpackThemeProvider>
    </SandpackProvider>
  );

  const records: Record[] = [
    {
      user: { avatarUrl: 'some URL', displayName: 'Bilbo Baggins' },
      duration: 175.254,
    },
    {
      user: { avatarUrl: 'some URL', displayName: 'Bilbo Baggins' },
      duration: 75,
    },
    {
      user: { avatarUrl: 'some URL', displayName: 'Bilbo Baggins' },
      duration: 11175,
    },
  ];

  return <Leaderboard records={records} />;
}
