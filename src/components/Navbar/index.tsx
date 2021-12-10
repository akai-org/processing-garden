import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Tabs,
  TabList,
  Tab,
  Spacer,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box shadow="md">
      <chakra.header
        bg={bg}
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
                icon={<div>lalal</div>}
                onClick={() => console.log(5)}
              />
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <div>PLCAE FOR LOGO</div>
            </chakra.a>
            <chakra.h1 fontSize="xl">Processing garden</chakra.h1>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <Button
              variant="solid"
              colorScheme="brand"
              rightIcon={<ChevronRightIcon />}
              size="sm"
            >
              Log out
            </Button>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
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
        <Tabs defaultIndex={1} borderBottomColor="transparent">
          <TabList>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Learning
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Challanges
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Sandbox
            </Tab>
          </TabList>
        </Tabs>
        <Spacer />
      </Flex>
    </Box>
  );
}
