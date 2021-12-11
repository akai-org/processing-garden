import { FC } from 'react';

import fs from 'fs';
import path from 'path';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const Steps: FC = ({ files }: any) => {
  const nextRouter = useRouter();

  const { gameId } = nextRouter.query;
  console.log(gameId);

  return (
    <>
      Steps
      <ul>
        {files.map((name: string) => (
          <Link key={name} href={`/games/${gameId}/steps/${name}`}>
            <li>{name}</li>
          </Link>
        ))}
      </ul>
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
