import { FC, useState } from 'react';
import { Box, Button, Spinner } from '@chakra-ui/react';

interface Props {
  type?: string;
  onClick?: () => void;
}

const SandpackWrapper: FC<Props> = ({ children, type, onClick }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={'custom-sandpack-wrapper'}>
      <Box my={4}>
        <Button
          mb={1}
          onClick={() => {
            setLoading(true);
            setVisible(false);
            setTimeout(() => setVisible(true));
            setTimeout(() => setLoading(false), 1000);
            onClick?.();
          }}
        >
          {type === 'result' ? 'Przetestuj' : 'Uruchom'}
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
