import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState, useRef } from 'react';
import db from 'db';
import { Sandbox } from '.prisma/client';
import Editor from '@monaco-editor/react';
import theme from 'editorTheme.json';
import withAuth from 'hoc/withAuth';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
// @ts-ignore
import { MonacoBinding } from 'y-monaco';
import { useRouter } from 'next/router';
import { useClipboard } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'pink'];

const initCode = `import p5 from 'p5';

const sketch = (s) => {
    s.setup = () => {
        s.createCanvas(300, 300);
    }

    s.draw = () => {
        s.background(220);
    }
}

const sketchInstance = new p5(sketch);`;

type SandboxRendererProps = {
  sandbox: Sandbox;
};

const SandboxRenderer = ({ sandbox }: SandboxRendererProps) => {
  const [code, setCode] = useState(initCode);
  const editorRef = useRef();
  const router = useRouter();

  async function connect() {
    const color = colors[Math.floor(Math.random() * colors.length)];

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(router?.query?.id as string, ydoc);
    const ytext = ydoc.getText('monaco');

    provider.awareness.setLocalStateField('user', {
      color,
    });

    // eslint-disable-next-line no-unused-vars
    const monacoBinding = new MonacoBinding(
      ytext,
      // @ts-ignore
      editorRef?.current?.getModel?.(),
      new Set([editorRef.current]),
      provider.awareness,
    );
  }

  const { onCopy } = useClipboard(router.asPath);
  const toast = useToast();

  return (
    <>
      <div>
        <Box p={4}>
          <Button mr={4} onClick={() => {}}>
            Zapisz
          </Button>
          <Button
            onClick={() => {
              onCopy();
              toast({
                title: 'Link został skopiowany do schowka',
                description:
                  'Wyśli go do swojego kolegi lub koleżanki, żeby razem pracować w Waszym Studio Twórców',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Udostępnij link do placu zabaw
          </Button>
        </Box>
        <div style={{ display: 'flex' }}>
          <Editor
            options={{ minimap: { enabled: false } }}
            onMount={(editor, monaco) => {
              monaco.editor.defineTheme(
                'vitesse-dark-processing-garden',
                theme,
              );
              monaco.editor.setTheme('vitesse-dark-processing-garden');
              editorRef.current = editor;
              connect().then(() => setCode(sandbox.code));
            }}
            width="50vw"
            height="calc(100vh - 133px)"
            value={code}
            onChange={(value = '') => setCode(value)}
            language="javascript"
          />
          <Box width="50vw" height="calc(100vh - 133px)">
            <SandpackProvider
              customSetup={{
                entry: '/index.js',
                dependencies: { p5: 'latest' },
                files: {
                  '/index.js': {
                    code,
                    active: true,
                  },
                },
              }}
            >
              <SandpackPreview />
            </SandpackProvider>
          </Box>
        </div>
        <style global>{` 
        .sp-preview-container,
        .sp-preview-iframe,
        .sp-stack {
          width: 500px !important;
          height: 500px !important;
          display: block !important;
        }
        `}</style>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await db.user.findFirst({
    where: { email: { equals: session?.user?.email! } },
  });

  const uuid = req?.url?.split('/')?.[2];

  const sandbox = await db.sandbox.findFirst({
    where: { id: { equals: uuid } },
  });

  const sbuser = await db.sandboxUser.findFirst({
    where: { userId: { equals: user?.id! }, sandboxId: { equals: uuid } },
  });

  if (!sbuser) {
    await db.sandboxUser.create({
      data: {
        sandboxId: sandbox?.id!,
        userId: user?.id!,
      },
    });
  }

  return {
    props: {
      sandbox,
    },
  };
};

export default withAuth(SandboxRenderer);
