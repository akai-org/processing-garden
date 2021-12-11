import { FC } from 'react';
import { ListCard } from '../../components';
import fs from 'fs';
import path from 'path';
import withAuth from 'hoc/withAuth';
import db from 'db';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const Learning: FC = ({ files, progress }: any) => {
  return (
    <>
      {files?.map((dirName: string, i: number) => {
        const {
          title,
          description,
        } = require(`content/learning/${dirName}/meta.ts`);

        let isActive = progress.map((el: any) => el.stepId >= i);
        if (isActive.length === 0) {
          isActive = [false];
        }
        if (progress.length === 0 && i === 0) {
          isActive = [true];
        }
        console.log(23, isActive);
        return (
          <ListCard
            isActive={isActive[0]}
            key={dirName}
            content={{ title, description, index: dirName }}
            type="Tutorial"
            href={`/learning/${dirName}`}
          />
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await db.user.findFirst({
    where: { email: session?.user?.email! },
  });
  let progress;
  if (user) {
    progress = await db.progress.findMany({
      where: { userId: { equals: user.id } },
    });
  }

  const files = fs.readdirSync(
    path.join(process.cwd(), 'src/content/learning'),
  );
  console.log(2, user);
  console.log(3, progress);
  return {
    props: { files, progress },
  };
};

export default withAuth(Learning);
