import { FC, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

const SandpackWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className={'custom-sandpack-wrapper'}>
      <Button
        mt={5}
        mb={5}
        onClick={() => {
          setVisible(false);
          setTimeout(() => setVisible(true));
        }}
      >
        Uruchom
      </Button>
      {isVisible && children}
    </div>
  );
};

export default SandpackWrapper;
