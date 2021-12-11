import { FC } from 'react';
import { ListCard } from '../../components';
import fs from 'fs';
import path from 'path';
import { Heading } from '@chakra-ui/react';

const Learning: FC = ({ files }: any) => {
  console.log(files);

  return (
    <>
      <Heading size="lg" textAlign="center">
        Opanuj game development!
      </Heading>

      {files?.map((dirName: string) => {
        const {
          title,
          description,
        } = require(`content/learning/${dirName}/meta.ts`);

        return (
          <ListCard
            key={dirName}
            dir="learning"
            content={{ title, description, index: dirName }}
            type="Tutorial"
          />
        );
      })}
    </>
  );
};

export async function getServerSideProps() {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'src/content/learning'),
  );

  return {
    props: { files },
  };
}

export default Learning;
