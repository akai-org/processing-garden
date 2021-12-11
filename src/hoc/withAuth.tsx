import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

const withAuth = (Component: ReactNode) => {
  const toReturn: FC<{ props: any }> = (props: any): ReactNode => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
      if (session?.status !== 'authenticated') {
        router.push('/');
      }
    });

    if (session?.status === 'loading') return null;

    return <Component {...props} />;
  };

  return toReturn;
};

export default withAuth;
