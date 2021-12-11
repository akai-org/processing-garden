import { useRouter } from 'next/router';
import { FC } from 'react';

const Step: FC = () => {
  const nextRouter = useRouter();

  const { stepId } = nextRouter.query;
  console.log(stepId);

  return <>Step {stepId}</>;
};

export default Step;
