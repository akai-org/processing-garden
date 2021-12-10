import { FC, useState } from 'react';
import { Button } from '@chakra-ui/react';

const SandpackWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className={'custom-sandpack-wrapper'}>
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
    </div>
  );
};

export default SandpackWrapper;
