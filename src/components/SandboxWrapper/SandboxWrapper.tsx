import { FC, useState } from 'react';
import { Button } from '@chakra-ui/react';

const SandboxWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      {isVisible && children}
      <Button
        onClick={() => {
          setTimeout(() => setVisible(true));
        }}
        colorScheme="blue"
      >
        Uruchom
      </Button>
    </>
  );
};

export default SandboxWrapper;
