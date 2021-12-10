import { Box } from '@chakra-ui/react';
import { Layout } from 'components';
import React, { FC } from 'react';

const TutorialContainer: FC = ({ children }) => {
  return (
    <Layout>
      <Box py={2}>{children}</Box>
    </Layout>
  );
};

export default TutorialContainer;
