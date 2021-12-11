import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
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
  handleNextButton: () => void;
}

const TutorialContainer: FC<TutorialContainerProps> = ({
  children,
  title,
  id,
  isFinished,
  codeTemplate,
  userValue,
  handleSubmit,
  handleNextButton,
}) => {
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
            <Button colorScheme="blue" ml={3} onClick={handleNextButton}>
              Kolejny tutorial
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default TutorialContainer;
