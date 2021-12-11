import React, { FC, useState } from 'react';
interface ResultInputProps {
  onChange?: any;
  onSuccess?: () => void;
  correctValue?: any;
  template?: (value?: any) => string;
}

const ResultInput: FC<ResultInputProps> = ({
  onChange,
  correctValue,
  onSuccess,
  template,
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
      <input
        type="text"
        value={value}
        onChange={(event) => {
          const v = event.target.value;
          setValue(v);
          onChange?.(event);
        }}
        style={{
          background: 'rgb(55, 56, 47)',
          borderRadius: '8px',
          padding: '0 8px',
        }}
      />
    </div>
  );
};

export default ResultInput;
