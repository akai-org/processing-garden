import { Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { GetServerSideProps } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';

type ProfileProps = {
  user?: DefaultSession['user'];
};

export default function Profile({ user }: ProfileProps) {
  const profileSession = useSession();
  console.log({ profileSession });

  return (
    <div>
      <chakra.h1>Profile</chakra.h1>
      <Text>name: {user?.name}</Text>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  console.log({ sess: session });

  if (!session?.user) {
    return { props: { user: undefined } };
  }

  return { props: { user: session.user } };
};
