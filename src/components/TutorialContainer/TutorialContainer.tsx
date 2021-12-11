import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface TutorialContainerProps {
  title: string;
}

const TutorialContainer: FC<TutorialContainerProps> = ({ children, title }) => {
  return (
    <Box py={10}>
      <Heading mb={10}>{title}</Heading>
      {children}
    </Box>
  );
};

export default TutorialContainer;
