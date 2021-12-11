import { useState } from 'react';
import withAuth from 'hoc/withAuth';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import db from 'db';
import { Button } from '@chakra-ui/button';
import { ListCard } from 'components';
import { Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { Input } from '@chakra-ui/input';
import { Sandbox } from '.prisma/client';

type SandboxListingProps = {
  sandboxes: {
    sandbox: {
      name: string;
      id: string;
    };
  }[];
};

const SandboxListing = ({ sandboxes }: SandboxListingProps) => {
  const [name, setName] = useState('');
  const router = useRouter();

  async function handleCreateSandbox() {
    return fetch('/api/sandbox', {
      method: 'POST',
      body: JSON.stringify({ name }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data: Sandbox) => router.push(`/sandbox/${data.id}`));
  }

  return (
    <>
      <Flex mt={8} alignItems="center">
        <Text>Nazwa: </Text>
        <Input
          mr={4}
          ml={4}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button pl={8} pr={8} onClick={handleCreateSandbox}>
          Stwórz nowy
        </Button>
      </Flex>
      {sandboxes.map(({ sandbox }, index) => (
        <ListCard
          key={sandbox.id}
          href={`/sandbox/${sandbox.id}`}
          content={{
            title: sandbox.name,
            index: index + 1,
          }}
          type="Plac zabaw"
        />
      ))}
    </>
  );
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

export default withAuth(SandboxListing);
