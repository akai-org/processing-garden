import { ReactNode, FC } from 'react';
import { Flex } from '@chakra-ui/react';
import styles from './ColumnWrapper.module.scss';
import '@codesandbox/sandpack-react/dist/index.css';

interface Props {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

const ColumnWrapper: FC<Props> = ({ leftContent, rightContent }) => {
  return (
    <div className={styles.container}>
      <Flex>
        {leftContent}
        {rightContent}
      </Flex>
    </div>
  );
};

export default ColumnWrapper;
