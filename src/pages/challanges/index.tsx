import { FC } from 'react';
import fs from 'fs';
import path from 'path';
import { ListCard } from 'components';
import { Heading } from '@chakra-ui/react';

const Challanges: FC = ({ files }: any) => {
  return (
    <>
      <Heading mb={10} textAlign="center">
        Sprawdź swoje umiejętności!
      </Heading>

      {files?.map((dirName: string) => {
        const { title } = require(`content/challanges/${dirName}/meta.ts`);

        return (
          <ListCard
            key={dirName}
            content={{ title, index: dirName }}
            type="Wyzwanie"
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
