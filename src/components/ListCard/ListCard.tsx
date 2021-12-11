import {
  chakra,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const ListCard = ({ content, type }: any) => {
  return (
    <Link
      px={3}
      py={1}
      color="gray.100"
      fontSize="sm"
      fontWeight="700"
      rounded="md"
      href={
        type === 'Tutorial'
          ? `/learning/${content.index}`
          : `/challanges/${content.index}`
      }
      key={content.index}
      textDecoration="none!important"
      _focus={{ outline: 'none' }}
    >
      <Flex
        pt={10}
        alignItems="center"
        justifyContent="center"
        height="fit-content"
      >
        <Box
          width="100%"
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue('white', '#202736')}
          cursor="pointer"
          display="flex"
          alignItems="center"
          height="fit-content"
        >
          <Box width="100%" mx="auto" px={8} py={4} mb={30}>
            <Flex>
              <Text
                px={3}
                py={1}
                bg="gray.600"
                color="gray.100"
                fontSize="sm"
                fontWeight="700"
                rounded="md"
                _hover={{ bg: 'gray.500' }}
              >
                {type} {content.index}
              </Text>
            </Flex>

            <Box mt={2}>
              <Text
                display={{ base: 'block', lg: 'inline' }}
                w="full"
                bgClip="text"
                bgGradient="linear(to-r, green.400,purple.500)"
                fontWeight="extrabold"
                fontSize="2xl"
              >
                {content.title}
              </Text>
              <chakra.p
                mt={2}
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {content.description}
              </chakra.p>
            </Box>
          </Box>
          <Box marginRight="1rem">
            <ChevronRightIcon boxSize="2rem" />
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

export default ListCard;
