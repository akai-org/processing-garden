import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

export default function Login({ providers }: LoginProps) {
  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        my={12}
      >
        <NextImage src="/logo.png" width={200} height={200} />
      </Box>
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex justifyContent="center" alignItems="center">
          {Object.values(providers).map((provider) => {
            if (provider.name === 'Email') {
              return null;
            }
            return (
              <Box
                key={provider.name}
                padding="8"
                rounded="lg"
                shadow="lg"
                bg={useColorModeValue('white', '#202736')}
                cursor="pointer"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <chakra.h1
                  mb={8}
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="bold"
                  lineHeight="none"
                  letterSpacing={{ base: 'normal', md: 'tight' }}
                  color={useColorModeValue('gray.900', 'gray.100')}
                >
                  Dołącz do{' '}
                  <Text
                    display={{ base: 'block', lg: 'inline' }}
                    w="full"
                    bgClip="text"
                    bgGradient="linear(to-r, green.400,purple.500)"
                    fontWeight="extrabold"
                  >
                    Processing Garden
                  </Text>
                </chakra.h1>
                <Button
                  variant="outline"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  Dołącz przez {provider.name}
                </Button>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
