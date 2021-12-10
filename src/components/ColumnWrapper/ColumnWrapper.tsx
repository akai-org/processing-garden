import {
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import Head from 'next/head';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import styles from './ColumnWrapper.module.scss';
import '@codesandbox/sandpack-react/dist/index.css';

interface Props {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const ColumnWrapper: React.FC<Props> = ({ leftContent, rightContent }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        {leftContent}
        {rightContent}
      </Flex>
    </div>
  );
};

export default ColumnWrapper;
