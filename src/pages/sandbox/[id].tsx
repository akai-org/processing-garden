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

// const initCode = `import p5 from 'p5';

// const sketch = (s) => {
//     s.setup = () => {
//         s.createCanvas(300, 300);
//     }

//     s.draw = () => {
//         s.background(220);
//     }
// }

// const sketchInstance = new p5(sketch);`;

type SandboxRendererProps = {
  sandbox: Sandbox;
};

const SandboxRenderer = ({ sandbox }: SandboxRendererProps) => {
  const [code, setCode] = useState(sandbox.code);
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

  const handleSaveSandbox = async (id: string, code: string) => {
    return fetch(`/api/sandbox/${id}`, {
      method: 'POST',
      body: JSON.stringify({ code }),
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: 'Stan Studia Twórców został zapisany',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <div>
        <Box p={4}>
          <Button
            mr={4}
            onClick={() => handleSaveSandbox(router?.query?.id as string, code)}
          >
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
                duration: 5000,
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
              connect().then(() => {
                setTimeout(() => {
                  if (!editor.getModel().getValue()) {
                    editor.getModel().setValue(sandbox.code);
                  }
                }, 1000);
              });
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

        #monaco-editor {
          width: 100%;
          height: 600px;
          border: 1px solid #ccc;
        }
        .yRemoteSelection {
          background-color: rgb(250, 129, 0, 0.5);
        }        
        .yRemoteSelectionHead {
          position: absolute;
          border-left: orange solid 2px;
          border-top: orange solid 2px;
          border-bottom: orange solid 2px;
          height: 100%;
          box-sizing: border-box;
        }
        .yRemoteSelectionHead::after {
          position: absolute;
          content: " ";
          border: 3px solid orange;
          border-radius: 4px;
          left: -4px;
          top: -5px;
        }

        .yRemoteSelection.yellow { background-color: #7b893180; }
        .yRemoteSelection.blue { background-color: #00aafa80; }
        .yRemoteSelection.green { background-color: #208b4180; }
        .yRemoteSelection.red { background-color: #e3111180; }
        .yRemoteSelection.orange { background-color: #e3851180; }
        .yRemoteSelection.ping { background-color: #9c11e380; }

        .yRemoteSelectionHead.yellow { border-color: #7b893180 }
        .yRemoteSelectionHead.blue { border-color: #00aafa80 }
        .yRemoteSelectionHead.green { border-color: #208b4180 }
        .yRemoteSelectionHead.red { border-color: #e3111180 }
        .yRemoteSelectionHead.orange { border-color: #e3851180 }
        .yRemoteSelectionHead.ping { border-color: #9c11e380 }

        .yRemoteSelectionHead::after.yellow { border-color: #7b893180 }
        .yRemoteSelectionHead::after.blue { border-color: #00aafa80 }
        .yRemoteSelectionHead::after.green { border-color: #208b4180 }
        .yRemoteSelectionHead::after.red { border-color: #e3111180 }
        .yRemoteSelectionHead::after.orange { border-color: #e3851180 }
        .yRemoteSelectionHead::after.ping { border-color: #9c11e380 }
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

  console.log({ req });

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
