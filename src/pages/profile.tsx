import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import withAuth from 'hoc/withAuth';
import { GetServerSideProps } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { v4 } from 'uuid';

const handleAddAchievement = async (name = v4()) => {
  return fetch(`/api/achievements`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    credentials: 'include',
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
};

type ProfileProps = {
  user?: DefaultSession['user'];
};

function Profile({ user }: ProfileProps) {
  const profileSession = useSession();
  console.log({ profileSession });

  return (
    <div>
      <chakra.h1>Profile</chakra.h1>
      <Text>name: {user?.name}</Text>

      <Button onClick={() => handleAddAchievement()}>
        Add mock achievement
      </Button>
    </div>
  );
}

export default withAuth(Profile);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return { props: { user: null } };
  }

  return { props: { user: session?.user } };
};
