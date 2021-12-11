import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import styles from './ResultSelection.module.scss';

interface Props {
  onChange?: any;
  onSuccess?: () => void;
  correctValue?: any;
  template?: (value?: any) => string;
  values: string[];
}

const ResultSelection: FC<Props> = ({
  onChange,
  correctValue,
  onSuccess,
  template,
  values,
}) => {
  console.log({ onChange, correctValue, onSuccess });

  const handleClick = (value: string) => {
    console.log('clicked');
    if (correctValue(value)) {
      onSuccess?.();
    }
  };

  return (
    <div className={styles.wrapper}>
      <VStack align="start" className={styles.stack}>
        {values.map((value) => (
          <Button
            w="100%"
            key={value}
            p={3}
            borderRadius={15}
            className={styles.button}
            onClick={() => handleClick(value)}
          >
            {value}
          </Button>
        ))}
      </VStack>
    </div>
  );
};

export default ResultSelection;
