import { Box, Image } from '@chakra-ui/react';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import { SandpackWrapper } from 'components';
import ColumnWrapper from 'components/ColumnWrapper/ColumnWrapper';
import withAuth from 'hoc/withAuth';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import theme from '../../editorTheme.json';

// const handleStepFinished = async (id: string) => {
//   return fetch(`/api/progress/learning/${id}`, {
//     method: 'POST',
//     credentials: 'include',
//   }).then((res) => res.json());
// };

const renderTemplate = `import * as p5 from 'p5';

function setup() {
  createCanvas(336, 250);
}

function draw() {
  background(0, 255, 0);
}

window.setup = setup;
window.draw = draw;`;

const renderSandpack = (code: string) => {
  return (
    <SandpackWrapper>
      <SandpackProvider
        customSetup={{
          entry: '/index.js',
          dependencies: { p5: 'latest' },
          files: {
            '/index.js': {
              code: (() => code)(),
              active: true,
            },
          },
        }}
      >
        <SandpackPreview />
      </SandpackProvider>
    </SandpackWrapper>
  );
};

const Challange: FC = () => {
  const router = useRouter();
  const [code, setCode] = useState(renderTemplate);

  const { id } = router.query;

  const meta = id ? require(`content/challanges/${id}/meta.ts`) : null;
  console.log(meta);

  if (id)
    return (
      <ColumnWrapper
        leftContent={
          <Editor
            options={{ minimap: { enabled: false } }}
            width="50vw"
            height="calc(100vh - 133px)"
            value={code}
            onChange={(value = '') => setCode(value)}
            language="javascript"
            onMount={(editor, monaco) => {
              monaco.editor.defineTheme(
                'vitesse-dark-processing-garden',
                theme,
              );
              monaco.editor.setTheme('vitesse-dark-processing-garden');
            }}
          />
        }
        rightContent={
          <Box style={{ padding: '15px' }} mb={0}>
            <Box
              mb={10}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              To create:
              <br />
              <Image src={`/challanges/${id}/image.png`} maxHeight={250} />
            </Box>
            Wynik:
            {renderSandpack(code)}
          </Box>
        }
      />
    );
  return null;
};

export default withAuth(Challange);
