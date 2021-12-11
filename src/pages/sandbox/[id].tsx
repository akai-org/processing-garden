import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import db from 'db';

const Sandbox: FC = () => {
  return <div>Sandbox</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await db.user.findFirst({
    where: { email: { equals: session?.user?.email! } },
  });

  const sandboxes = await db.sandboxUser.findMany({
    where: { userId: { equals: user?.id } },
    orderBy: { createdAt: 'desc' },
    include: {
      sandbox: {
        select: { name: true, id: true },
      },
    },
  });

  return {
    props: {
      sandboxes: sandboxes.map(({ sandbox }) => ({ sandbox })),
    },
  };
};

export default Sandbox;
