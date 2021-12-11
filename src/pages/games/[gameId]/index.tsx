import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

import { SandpackWrapper } from 'components';
import router, { useRouter } from 'next/router';
import React, { FC } from 'react';

import fs from 'fs';
import path from 'path';
import { Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

const Game: FC = ({ files }: any) => {
  const nextRouter = useRouter();
  const [code, setCode] = React.useState('');

  const { gameId } = nextRouter.query;

  React.useEffect(() => {
    if (!files.includes(gameId)) {
      router.push('/games');
    }
  });

  if (files.includes(gameId)) {
    const Task = gameId ? require(`content/games/${gameId}/game.mdx`) : null;
    const template = gameId
      ? require(`content/games/${gameId}/game.template.ts`)
      : null;
    const meta = gameId ? require(`content/games/${gameId}/meta.ts`) : null;

    return (
      <>
        <Heading>{meta.title}</Heading>
        <Task.default onChange={(value: string) => setCode(value)} />
        <SandpackWrapper>
          <SandpackProvider
            customSetup={{
              entry: '/index.js',
              dependencies: { p5: 'latest' },
              files: {
                '/index.js': {
                  active: true,
                  code: template.codeTemplate(code),
                },
              },
            }}
          >
            <SandpackPreview />
          </SandpackProvider>
        </SandpackWrapper>

        <Link passHref={true} href={`/games/${gameId}/steps`}>
          <Button colorScheme="pink">Start</Button>
        </Link>
      </>
    );
  } else {
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/games/'));

  return {
    props: { files },
  };
};

export default Game;
