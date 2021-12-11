import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import Link from 'next/link';
import SandpackWrapper from 'components/SandpackWrapper/SandpackWrapper';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
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
  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin === 'https://0-9-13-sandpack.codesandbox.io') {
            console.log(event.data)
        }
      },
      false,
    );
  }, []);
  return (
    <Box py={10}>
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
