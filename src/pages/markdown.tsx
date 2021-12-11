import React from 'react';
import Content from './../content/test/test.mdx';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import '@code-hike/mdx/dist/index.css';

export default function Home() {
  const [code, setCode] = React.useState('');

  console.log(Content);

  const handleChange = (value: any) => {
    setCode(value);
  };

  const onSuccess = () => console.log('success');

  return (
    <>
      <Content handleChange={handleChange} onSuccess={onSuccess} />

      <SandpackProvider
        customSetup={{
          entry: '/index.js',
          dependencies: { p5: 'latest' },
          files: {
            '/index.js': {
              code,
              active: true,
            },
          },
        }}
      >
        <SandpackPreview />
      </SandpackProvider>
    </>
  );
}
