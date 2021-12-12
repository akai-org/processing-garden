import {
  Box,
  Button,
  chakra,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import NextImage from 'next/image';

export default function Home() {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <Box px={8} py={24} mx="auto" width="fit-content">
      <Box
        mb={10}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NextImage src="/logo.png" width={200} height={200} />
      </Box>
      <Box w={{ base: 'full' }} mx="auto" textAlign={'center'}>
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            Processing Garden
          </Text>
          <br />
          aby łączyć wszystkich poprzez gry!
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          Ucz, graj, baw się, zdobywaj punkty, osiągnięcia oraz rywalizuj z
          innymi programując!
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          {!isAuthenticated && (
            <Button
              as="a"
              variant="solid"
              colorScheme="brand"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: 'full', sm: 'auto' }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
              onClick={() => signIn()}
            >
              Rozpocznij
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
