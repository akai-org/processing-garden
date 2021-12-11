import { FC } from 'react';
import { ListCard } from '../../components';
import fs from 'fs';
import path from 'path';
import { Heading } from '@chakra-ui/react';

const Games: FC = ({ files }: any) => {
  console.log('game', files);

  return (
    <>
      <Heading size="lg" textAlign="center">
        Zbuduj i zagraj!
      </Heading>
      {files?.map((dirName: string) => {
        const {
          title,
          description,
        } = require(`content/games/${dirName}/meta.ts`);

        return (
          <ListCard
            key={dirName}
            content={{ title, description, index: dirName }}
            type="Game"
            dir="games"
          />
        );
      })}
    </>
  );
};

export async function getServerSideProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/games'));

  return {
    props: { files },
  };
}

export default Games;
