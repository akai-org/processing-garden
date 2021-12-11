import { FC, useState, useEffect } from 'react';

interface ResultInputProps {
  onChange?: any;
  onSuccess?: () => void;
  correctValue?: any;
  template?: (value?: any) => string;
}

const ResultInput: FC<ResultInputProps> = ({
  onChange,
  correctValue,
  template,
}) => {
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        background: '#181c24',
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
          background: '#1d222c',
          borderRadius: '8px',
          padding: '0 8px',
        }}
      />
    </div>
  );
};

export default ResultInput;
