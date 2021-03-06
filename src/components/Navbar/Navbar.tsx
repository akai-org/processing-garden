import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  IconButton,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const routesIndexes: { [key: string]: number } = {
  '/learning': 0,
  '/games': 1,
  '/sandbox': 2,
  '/challanges': 3,
};

export default function Navbar() {
  const { pathname } = useRouter();
  const defaultIndex: number = routesIndexes?.[pathname];

  const session = useSession();

  return (
    <Box shadow="md">
      <chakra.header
        bg={useColorModeValue('white', 'gray.800')}
        borderColor="gray.600"
        borderBottomWidth={1}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
              />
            </Box>
            <Link passHref href="/">
              <chakra.a
                title="Choc Home Page"
                display="flex"
                alignItems="center"
              >
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  mr={4}
                >
                  <Image src="/logo.png" width={35} height={35} />
                </Box>
                <chakra.h1 fontSize="xl">
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
              </chakra.a>
            </Link>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            {session.status === 'unauthenticated' && (
              <Link href="/login">
                <Button
                  variant="solid"
                  colorScheme="brand"
                  rightIcon={<ChevronRightIcon />}
                  size="sm"
                >
                  Zaloguj
                </Button>
              </Link>
            )}
            {session.status === 'authenticated' && (
              <>
                <Text>Witaj, {session.data.user?.name}!</Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Avatar
                      size="sm"
                      name={session.data.user?.name || ''}
                      src={session.data.user?.image || ''}
                    />
                  </MenuButton>
                  <MenuList>
                    <Link href="/profile">
                      <MenuItem>Profil</MenuItem>
                    </Link>
                    <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                      Wyloguj
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
      >
        {session.status === 'authenticated' && (
          <Container maxW="full">
            <Tabs
              borderBottomColor="transparent"
              defaultIndex={defaultIndex || 9999}
            >
              <TabList>
                <Link href="/learning">
                  <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                    Lekcje
                  </Tab>
                </Link>
                <Link href="/games">
                  <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                    Gry
                  </Tab>
                </Link>
                <Link href="/challanges">
                  <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                    Wyzwania
                  </Tab>
                </Link>
                <Link href="/sandbox">
                  <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                    Studio tw??rc??w
                  </Tab>
                </Link>
              </TabList>
            </Tabs>
          </Container>
        )}
      </Flex>
    </Box>
  );
}
