import { Heading } from '@chakra-ui/react';
import { SandpackWrapper } from 'components';
import withAuth from 'hoc/withAuth';
import { FC } from 'react';

const Sandbox: FC = () => {
  return (
    <>
      <Heading size="lg" textAlign="center">
        Twórz bez ograniczeń!
      </Heading>
      <SandpackWrapper>Sandpack</SandpackWrapper>;
    </>
  );
};

export default withAuth(Sandbox);
