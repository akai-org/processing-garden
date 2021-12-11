import React, { FC, useState } from 'react';

import styles from './ResultInput.module.css';

interface ResultInputProps {
  onChange?: any;
  onSuccess?: () => void;
  correctValue?: any;
  template?: (value?: any) => string;
  tabs: number;
}

const ResultInput: FC<ResultInputProps> = ({
  onChange,
  correctValue,
  onSuccess,
  template,
  tabs = 0,
}) => {
  console.log({ onChange, correctValue, onSuccess });

  const [value, setValue] = useState('');

  React.useEffect(() => {
    if (correctValue()) {
      onSuccess?.();
    }
  }, [value]);

  return (
    <div
      style={{
        background: 'rgb(39, 40, 34)',
        paddingLeft: '32px',
        marginTop: '-20px',
        marginBottom: '-20px',
      }}
    >
      <textarea
        // type="text"
        value={value}
        onChange={(event) => {
          const v = event.target.value;
          setValue(v);
          onChange?.(template?.(v));
        }}
        className={styles['code-input']}
        style={{ marginLeft: `${tabs * 20}px` }}
      />
    </div>
  );
};

export default ResultInput;
