import {
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import React from 'react';
import '@codesandbox/sandpack-react/dist/index.css';
import ColumnWrapper from 'components/ColumnWrapper/ColumnWrapper';

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
      width="50vw"
      height="100vh"
      value={code}
      onChange={(value = '') => setCode(value)}
      language="javascript"
      theme="vs-dark"
      options={{}}
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

  return <ColumnWrapper leftContent={editor} rightContent={preview} />;
}
