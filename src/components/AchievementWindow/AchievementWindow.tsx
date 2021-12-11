import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import styles from './AchievementWindow.module.scss';
import Link from 'next/link';
import useAchievement from 'hooks/useAchievement';

export const achievementIconsMap = new Map([
  ['Wykonano pierwszą lekcję', 'iconsvg-07'],
]);

export type AchievementType = {
  name?: string;
  description?: string;
};

const AchievementModal = ({
  name = 'Początkujący',
  description = 'Wykonano pierwszą lekcję',
}: AchievementType) => {
  const iconName = achievementIconsMap.get(description);

  const { closeModal } = useAchievement();

  return (
    <div className={styles.overlay}>
      <Box
        className={styles.popup}
        rounded="lg"
        shadow="xl"
        p={10}
        display="flex"
        flexDirection="column"
      >
        <Heading size="md" textAlign="center">
          Zdobyłeś osiągnięcie!
        </Heading>
        <Heading my={5} textAlign="center">
          {name}
        </Heading>
        <Box display="flex" justifyContent="center">
          <Image src={`/svg/${iconName}.svg`} width={100} height={100} />
        </Box>
        <Text mt={7} textAlign="center">
          {description}
        </Text>
        <ButtonGroup mx="auto" mt={7}>
          <Button onClick={closeModal}>Zamknij</Button>
          <Link href="/profile">
            <Button onClick={closeModal} colorScheme="blue">
              Zobacz profil
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default AchievementModal;
