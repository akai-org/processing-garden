import {
  chakra,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const ListCardContent = ({ content, type, isActive, href }: any) => {
  return (
    <Flex pt={10} alignItems="center" justifyContent="center">
      <Box
        width="100%"
        rounded="lg"
        shadow="lg"
        bg={
          isActive
            ? useColorModeValue('white', '#202736')
            : useColorModeValue('white', 'gray.800')
        }
        cursor={isActive ? 'pointer' : 'not-allowed'}
        display="flex"
        alignItems="center"
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
            <chakra.p mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
              {content.description}
            </chakra.p>
          </Box>
        </Box>
        <Box marginRight="1rem">
          <ChevronRightIcon boxSize="2rem" />
        </Box>
      </Box>
    </Flex>
  );
};

const ListCard = ({ content, type, isActive = true, href }: any) => {
  return (
    <>
      {isActive ? (
        <Link
          px={3}
          py={1}
          color="gray.100"
          fontSize="sm"
          fontWeight="700"
          rounded="md"
          href={href}
          key={content.index}
          textDecoration="none!important"
          _focus={{ outline: 'none' }}
        >
          <ListCardContent content={content} type={type} isActive={isActive} />
        </Link>
      ) : (
        <div>
          <Box
            px={3}
            py={1}
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            href={`/learning/${content.index}`}
            key={content.index}
            textDecoration="none!important"
            _focus={{ outline: 'none' }}
          >
            <ListCardContent
              content={content}
              type={type}
              isActive={isActive}
            />
          </Box>
        </div>
      )}
    </>
  );
};

export default ListCard;
