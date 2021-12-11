<<<<<<< Updated upstream
import React, { FC, useState, useEffect } from 'react';

=======
import React, { FC, useState } from 'react';
>>>>>>> Stashed changes
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
  const [value, setValue] = useState('');

  useEffect(() => {
    if (correctValue(value)) {
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
