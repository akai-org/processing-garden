import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  title: string;
  isWon: boolean;
}

const GameModal: FC<Props> = ({ isOpen, message, onClose, title, isWon }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Spróbuj ponownie
          </Button>
          {isWon ? (
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Przejdź dalej
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
