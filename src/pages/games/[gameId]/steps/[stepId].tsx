import { GetServerSideProps } from 'next';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

import { ColumnWrapper, SandpackWrapper } from 'components';
import router, { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import fs from 'fs';
import path from 'path';
import { Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Step: FC = () => {
  const nextRouter = useRouter();
  const [customCode, setCustomCode] = useState('');

  const Task = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/step.mdx`);
  const metaFile = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/meta.ts`);
  const template = require(`content/games/${nextRouter.query.gameId}/steps/${nextRouter.query.stepId}/step.template.ts`);

  const changeHandler = (value: string) => {
    setCustomCode(value);
    console.log(template.codeTemplate(customCode));
  };

  return (
    <>
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
