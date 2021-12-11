import { FC, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

const SandpackWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className={'custom-sandpack-wrapper'}>
      <Box p={4}>
        <Button
          onClick={() => {
            setVisible(false);
            setTimeout(() => setVisible(true));
          }}
          colorScheme="blue"
        >
          Uruchom
        </Button>
        {isVisible && children}
      </Box>
    </div>
  );
};

export default SandpackWrapper;
