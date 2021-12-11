import { GetServerSideProps } from 'next';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

import { ColumnWrapper, SandpackWrapper } from 'components';
import router, { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

import fs from 'fs';
import path from 'path';
import { Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import GameModal from 'components/GameModal/GameModal';

const Step: FC = () => {
  const nextRouter = useRouter();
  const [customCode, setCustomCode] = useState('');
  const [isWon, setIsWon] = useState(false);
  const [result, setResult] = useState(false);

  const Task = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/step.mdx`);
  const metaFile = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/meta.ts`);
  const template = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/step.template.ts`);

  const changeHandler = (value: string) => {
    setCustomCode(value);
    console.log(template.codeTemplate(customCode));
  };

  const messageHandler = (event: MessageEvent<any>) => {
    if (
      event.origin !== 'https://0-9-13-sandpack.codesandbox.io' ||
      event.data.type !== 'gameResults'
    )
      return;
    setResult(true);
    setIsWon(event.data.state === 'won');
  };

  useEffect(() => {
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  });

  const title = isWon ? 'Gratulację, wygrałeś!' : 'Niestety, nie udało ci się!';

  const message = isWon
    ? 'Udało ci się! Możesz przejść dalej lub spróbować jeszcze raz'
    : 'Gdzieś popełniłeś błąd - spróbuj ponownie';

  return (
    <>
      <GameModal
        isWon={isWon}
        isOpen={result}
        message={message}
        title={title}
        onClose={() => setResult(false)}
      />
      <Heading size="lg">{metaFile.title}</Heading>
      <Text>{metaFile.description}</Text>

      <Task.default onChange={changeHandler} />
      <div id="space-invaders-preview">
        <SandpackWrapper>
          <SandpackProvider
            customSetup={{
              entry: '/index.js',
              dependencies: { p5: 'latest' },
              files: {
                '/index.js': {
                  active: true,
                  code: template.codeTemplate(customCode),
                },
              },
            }}
          >
            <SandpackPreview />
          </SandpackProvider>
        </SandpackWrapper>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const files = fs.readdirSync(
    path.join(
      process.cwd(),
      `src/content/games/${query.gameId}/steps/${query.stepId}`,
    ),
  );

  return {
    props: { files },
  };
};

export default Step;
