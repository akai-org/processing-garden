import { FC } from 'react';
import { ListCard } from '../../components';
import fs from 'fs';
import path from 'path';

const Learning: FC = ({ files }: any) => {
  console.log(files);

  return (
    <>
      {files?.map((dirName: string) => {
        const {
          title,
          description,
        } = require(`content/learning/${dirName}/meta.ts`);

        return (
          <ListCard
            key={dirName}
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
