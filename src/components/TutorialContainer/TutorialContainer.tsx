import { Box } from '@chakra-ui/react';
import { Layout } from 'components';
import React, { FC } from 'react';

const TutorialContainer: FC = ({ children }) => {
  return <Box py={2}>{children}</Box>;
};

export default TutorialContainer;
