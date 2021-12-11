import { FC, useState } from 'react';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { SandpackWrapper } from 'components';

import Task from '../../content/games/game.mdx';
import withAuth from 'hoc/withAuth';

const Games: FC = () => {
  const [code, setCode] = useState('');

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

export default withAuth(Games);
