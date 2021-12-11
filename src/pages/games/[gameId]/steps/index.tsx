import { FC } from 'react';

import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ListCard } from 'components';

const Steps: FC = ({ files }: any) => {
  const nextRouter = useRouter();

  const { gameId } = nextRouter.query;

  const metaFiles: { fileName: string; title: string }[] = files.map(
    (fileName: string) => ({
      fileName,
      title: require(`content/games/${gameId}/steps/${fileName}/meta.ts`).title,
    }),
  );

  const gameTitle = require(`content/games/${gameId}/meta.ts`).title;

  return (
    <>
      {metaFiles.map(({ fileName, title }) => {
        return (
          <ListCard
            isActive={true}
            key={fileName}
            dir="games"
            content={{ title }}
            type={gameTitle}
            href={`/games/${gameId}/steps/${fileName}`}
          />
        );
      })}
    </>
  );
};

export default Steps;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const files = fs.readdirSync(
    path.join(process.cwd(), `src/content/games/${query.gameId}/steps/`),
  );

  return {
    props: { files },
  };
};
