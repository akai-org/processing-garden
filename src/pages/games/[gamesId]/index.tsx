import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

import { SandpackWrapper } from 'components';
import router, { useRouter } from 'next/router';
import React, { FC } from 'react';

import fs from 'fs';
import path from 'path';
import { Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Game: FC = ({ files }: any) => {
  const nextRouter = useRouter();
  const [code, setCode] = React.useState('');

  const { id } = nextRouter.query;
  console.log(id);
  React.useEffect(() => {
    if (!files.includes(id)) {
      router.push('/games');
    }
  });

  if (files.includes(id)) {
    const Task = id ? require(`content/games/${id}/game.mdx`) : null;
    const template = id
      ? require(`content/games/${id}/game.template.ts`)
      : null;
    const meta = id ? require(`content/games/${id}/meta.ts`) : null;

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

        <Link passHref={true} href={`/games/${id}/step/1`}>
          <Button colorScheme="pink">Start</Button>
        </Link>
      </>
    );
  } else {
    return null;
  }
};

export async function getServerSideProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/games'));

  return {
    props: { files },
  };
}

export default Game;
