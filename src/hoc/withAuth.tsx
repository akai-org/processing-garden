import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const toReturn: FC<{ props: any }> = (props: any) => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
      if (session?.status === 'unauthenticated') {
        router.push('/');
      }
    });

    if (session?.status === 'loading') return null;

    return <Component {...(props as any)} />;
  };

  return toReturn;
};

export default withAuth;
