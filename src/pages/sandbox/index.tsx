import { SandpackWrapper } from 'components';
import withAuth from 'hoc/withAuth';
import { FC } from 'react';

const Sandbox: FC = () => {
  return <SandpackWrapper>Sandpack</SandpackWrapper>;
};

export default withAuth(Sandbox);
