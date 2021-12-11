import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import { SandpackWrapper } from 'components';
import React, { FC } from 'react';

import Task from '../../content/games/game.mdx';

const Games: FC = () => {
  const [code, setCode] = React.useState('');

  return (
    <>
      <h1>Games</h1>
      <Task />

      <SandpackWrapper>
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
      </SandpackWrapper>
    </>
  );
};

export default Games;
