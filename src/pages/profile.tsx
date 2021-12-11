import { chakra } from '@chakra-ui/system';
import withAuth from 'hoc/withAuth';
import { GetServerSideProps } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import db from 'db';
import { Box, useColorModeValue, Grid } from '@chakra-ui/react';
import { UserCard } from '../components';
import Image from 'next/image';

type ProfileProps = {
  user?: DefaultSession['user'];
  points: number;
  achievements: any;
};

function Profile({ user, points, achievements }: ProfileProps) {
  const profileSession = useSession();

  return (
    <Box mt={10}>
      <Box mt={10} mb={10}>
        <UserCard
          name={user?.name}
          image={user?.image}
          points={points}
        ></UserCard>
      </Box>

      <Box mt={20} mb={20}>
        <chakra.h1
          fontSize="2xl"
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
        >
          Twoje osiągnięcia:
        </chakra.h1>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
          {achievements.map((el: any) => (
            <Image src="/svg/iconsvg-01.svg" width={90} height={90} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default withAuth(Profile);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await db.user.findFirst({
    where: { email: { equals: session?.user?.email! } },
  });

  const points = await db.progress.count({
    where: { userId: { equals: user?.id } },
  });

  const achievements = await db.achievement.findMany({
    where: { userId: { equals: user?.id } },
  });

  if (!session?.user) {
    return { props: { user: null } };
  }

  return { props: { user: session?.user, points, achievements } };
};
