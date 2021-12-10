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
      href={`/learning/${content.index + 1}`}
      key={content.index + 1}
      textDecoration="none!important"
    >
      <Flex pt={10} w="full" alignItems="center" justifyContent="center">
        <Box
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue('white', '#202736')}
          cursor="pointer"
          display="flex"
          alignItems="center"
        >
          <Box mx="auto" px={8} py={4} mb={30}>
            <Flex justifyContent="flex-end">
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
                {type} {content.index + 1}
              </Text>
            </Flex>

            <Box mt={2}>
              <Link
                fontSize="2xl"
                color={useColorModeValue('gray.700', 'white')}
                fontWeight="700"
                _hover={{
                  color: useColorModeValue('gray.600', 'gray.200'),
                }}
              >
                <Text
                  display={{ base: 'block', lg: 'inline' }}
                  w="full"
                  bgClip="text"
                  bgGradient="linear(to-r, green.400,purple.500)"
                  fontWeight="extrabold"
                >
                  {content.title}
                </Text>
              </Link>
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
