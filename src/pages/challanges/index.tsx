import { FC } from 'react';
import fs from 'fs';
import path from 'path';
import { ListCard } from 'components';

const Challanges: FC = ({ files }: any) => {
  console.log(files);

  return (
    <>
      {files?.map((dirName: string) => {
        const { title } = require(`content/challanges/${dirName}/meta.ts`);

        return (
          <ListCard
            key={dirName}
            content={{ title, index: dirName }}
            type="Challange"
            href={`/challanges/${dirName}`}
          />
        );
      })}
    </>
  );
};

export async function getServerSideProps() {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'src/content/challanges'),
  );

  return {
    props: { files },
  };
}

export default Challanges;
