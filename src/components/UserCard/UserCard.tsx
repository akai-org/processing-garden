import React from 'react';
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import Image2 from 'next/image';

const Card = ({ name, image, points }: any) => {
  return (
    <Box
      w="xs"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      mx="auto"
    >
      <Image w="full" h={56} fit="cover" src={image} alt="avatar" />

      <Box py={5} textAlign="center">
        <Text
          display="block"
          fontSize="2xl"
          color={useColorModeValue('gray.800', 'white')}
          fontWeight="bold"
        >
          {name}
        </Text>
        <chakra.span
          fontSize="sm"
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text
              mr={2}
              display="block"
              fontSize="3xl"
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
            >
              {points}
            </Text>
            <Image2 src="/svg/star.svg" width={35} height={35} />
          </Box>
        </chakra.span>
      </Box>
    </Box>
  );
};

export default Card;
