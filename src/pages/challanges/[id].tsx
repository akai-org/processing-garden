import { Box, Image } from '@chakra-ui/react';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import { SandpackWrapper } from 'components';
import ColumnWrapper from 'components/ColumnWrapper/ColumnWrapper';
import Leaderboard, { Record } from 'components/Leaderboard/Leaderboard';
import withAuth from 'hoc/withAuth';
import useAchievement from 'hooks/useAchievement';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import theme from '../../editorTheme.json';
// @ts-ignore
// import { diff } from 'imagediff/js/imagediff';

// const handleStepFinished = async (id: string) => {
//   return fetch(`/api/progress/learning/${id}`, {
//     method: 'POST',
//     credentials: 'include',
//   }).then((res) => res.json());
// };

const recordsInitial: Record[] = [
  {
    user: { avatarUrl: 'some URL', displayName: 'Bilbo' },
    duration: 223,
  },
  {
    user: { avatarUrl: 'some URL', displayName: 'Eddy' },
    duration: 311,
  },
  {
    user: { avatarUrl: 'some URL', displayName: 'Eric' },
    duration: 509,
  },
];

const renderTemplate = `import * as p5 from 'p5';

function setup() {
  createCanvas(336, 250);
  background(78, 122, 39);
  strokeWeight(0);
  fill(255, 147, 0)
  rect(70, 50, 190, 150);
}

window.setup = setup`;

const renderSandpack = (code: string, onClick: any) => {
  return (
    <SandpackWrapper onClick={onClick}>
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
  const [records, setRecords] = useState(recordsInitial);
  const session = useSession();

  const { setAchievement } = useAchievement();

  const handleSubmit = () => {
    setTimeout(() => {
      setRecords((records) => [
        {
          user: {
            avatarUrl: 'some URL',
            displayName: session.data?.user?.name!,
          },
          duration: 143,
        },
        ...records,
      ]);

      setAchievement({
        description: 'Osiągnięto pierwsze miejsce w tabeli',
        name: 'Zwycięzca',
      });
    }, 1000);
  };

  const { id } = router.query;

  if (id)
    return (
      <ColumnWrapper
        leftContent={
          <Box display="flex" flexDirection="column">
            <Editor
              options={{ minimap: { enabled: false } }}
              width="50vw"
              height="40vh"
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
            <Leaderboard records={records} />
          </Box>
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
            {renderSandpack(code, handleSubmit)}
          </Box>
        }
      />
    );
  return null;
};

export default withAuth(Challange);
