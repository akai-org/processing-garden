import { useRouter } from 'next/router';
import { FC } from 'react';

const Step: FC = () => {
  const nextRouter = useRouter();

  const { id } = nextRouter.query;
  console.log(id);
  return null;
};

export default Step;
