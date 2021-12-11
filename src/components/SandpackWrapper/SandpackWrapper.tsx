import { FC, useState } from 'react';
import { Box, Button, Spinner } from '@chakra-ui/react';

const SandpackWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={'custom-sandpack-wrapper'}>
      <Box my={4}>
        <Button
          onClick={() => {
            setLoading(true);
            setVisible(false);
            setTimeout(() => setVisible(true));
            setTimeout(() => setLoading(false), 1000);
          }}
        >
          Uruchom
        </Button>
        <div style={{ position: 'relative' }}>
          {isLoading && (
            <Spinner
              style={{ position: 'absolute', marginTop: '15px' }}
              color="white.500"
            />
          )}
          {isVisible && children}
        </div>
      </Box>
    </div>
  );
};

export default SandpackWrapper;
