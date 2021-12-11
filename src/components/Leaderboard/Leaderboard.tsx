import {
  Flex,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  SimpleGrid,
  chakra,
  Button,
  ButtonGroup,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export interface User {
  displayName: string;
  avatarUrl: string;
}

export interface Record {
  user: User;
  duration: number;
}

interface Props {
  records: Record[];
}

const Leaderboard: React.FC<Props> = ({ records }) => {
  const secondsInHour = 3600;

  dayjs.extend(duration);
  return (
    <Flex
      w="full"
      p={50}
      alignItems="center"
      justifyContent="center"
      shadow={'lg'}
    >
      <Table w="full" bg={useColorModeValue('white', 'gray.800')}>
        <Thead>
          <Tr>
            <Th>Miejsce</Th>
            <Th>Imię</Th>
            <Th>Czas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record, index) => {
            const formatedDuration = dayjs
              .duration(record.duration, 'seconds')
              .format('mm:ss');
            return (
              <Tr key={index}>
                <Td>#{index + 1}</Td>
                <Td>{record.user.displayName}</Td>
                <Td>{formatedDuration}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Leaderboard;
