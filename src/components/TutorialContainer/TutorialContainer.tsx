import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import SandpackWrapper from 'components/SandpackWrapper/SandpackWrapper';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import GameModal from 'components/GameModal/GameModal';
interface TutorialContainerProps {
  title: string;
  id: string | string[];
  isFinished: boolean;
  codeTemplate: (value: string) => string;
  userValue: string;
  handleSubmit: () => void;
}

const TutorialContainer: FC<TutorialContainerProps> = ({
  children,
  title,
  id,
  isFinished,
  codeTemplate,
  userValue,
  handleSubmit,
}) => {
  const [modal, setModal] = useState(true);
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    const listener = window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== 'https://0-9-13-sandpack.codesandbox.io') return;
        if (event.data.type === 'gameResults') {
          setModal(true);
          setIsWon(event.data.state === 'won');
        }
      },
      false,
    );
    return () => {
      window.removeEventListener('message', listener);
      console.log('event removed');
    };
  }, []);

  const modalTitle = isWon
    ? 'Gratulacje, wygrałeś!'
    : 'Niestety, nie udało ci się :(';

  const modalMessage = isWon
    ? `Świetnie ci poszło! Możesz teraz przejść do kolejnego zadania
    lub spróbować swoich sił jeszcze raz`
    : `Musisz jeszcze popracować nad swoim kodem. Kliknij 
    'Spróbuj ponownie', by jeszcze raz zmierzyć się z zadaniem`;

  return (
    <Box py={10}>
      <GameModal
        title={modalTitle}
        isOpen={modal}
        onClose={() => setModal(false)}
        message={modalMessage}
        isWon={isWon}
      />
      <Heading mb={10}>{title}</Heading>
      {children}

      <SandpackWrapper type="result" onClick={handleSubmit}>
        <SandpackProvider
          customSetup={{
            entry: '/index.js',
            dependencies: { p5: 'latest' },
            files: {
              '/index.js': {
                code: codeTemplate?.(userValue) ?? codeTemplate,
                active: true,
              },
            },
          }}
        >
          <SandpackPreview />
        </SandpackProvider>
      </SandpackWrapper>
      <Flex justifyContent="flex-end">
        <Link href={`/learning`}>
          <Button>Wróć do lekcji</Button>
        </Link>

        {isFinished && (
          <Link href={`/learning/${+id + 1}`}>
            <Button colorScheme="blue" ml={3}>
              Kolejny tutorial
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default TutorialContainer;
