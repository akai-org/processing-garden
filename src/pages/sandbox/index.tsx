import { FC } from 'react';
import withAuth from 'hoc/withAuth';

const SandboxListing: FC = () => {
  return <div>SandboxListing</div>;
};

export default withAuth(SandboxListing);
